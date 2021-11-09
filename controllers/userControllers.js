const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Payments = require('../models/paypalModel')
const userControllers = {
    //Đăng ký
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const user = await Users.findOne({ email })
            // res.status để thể hiện trạng thái phàn hồi ở client
            if (user) return res.status(400).json({ msg: 'Email đã tồn tại.' })

            if (password.length < 6)
                return res.status(400).json({ msg: 'Password phải ít nhất 6 kí tự.' })
            // mã hóa mật khẩu           
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash
            })
            // Lưu trên mongoose
            await newUser.save()

            // Tạo jsonwebtoken để xác thực
            const accessToken = createAccessToken({ id: newUser._id })
            const refreshToken = createRefreshToken({ id: newUser._id })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 
            })

            res.json({ " accessToken": accessToken }) 

            // res.json(newUser)

        } catch (err) {
            //// res.status để thể hiện trạng thái phàn hồi ở server
            return res.status(500).json({ msg: err.message })
        }

    },
    // Đăng nhập
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: 'Tài khoản không tồn tại' })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: 'Sai mật khẩu ' })

            // Nếu đăng nhập thành công thì tạo accesstoken và refresh token

            const accessToken = createAccessToken({ id: user._id })
            const refreshToken = createRefreshToken({ id: user._id })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 //7 ngay
            })

            res.json({ " accessToken": accessToken }) 
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    //Đăng xuất
    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshToken',{path:'/user/refresh_token'})
            return res.json({msg:"Đã Đăng Xuất"})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshToken;

            if (!rf_token) return res.status(400).json({ msg: 'Vui lòng đăng nhập hoặc đăng ký' })

            jwt.verify(rf_token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

                if (err) return res.status(400).json({ msg: 'Vui lòng đăng nhập hoặc đăng ký' })

                const accessToken = createAccessToken({ id: user.id })
                res.json({ accessToken })
            })

            res.json({ rf_token })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    getUser: async (req,res) =>{
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if (!user) return res.status(400).json({ msg: 'Tài khoản không tồn tại.' })
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addCart: async (req, res) =>{
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    history: async(req, res) =>{
        try {
            const history = await Payments.find({user_id: req.user.id})

            res.json(history)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
 
}
//tạo cập token
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}
// gia hạn token
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userControllers