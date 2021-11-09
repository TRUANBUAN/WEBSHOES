const Users =  require('../models/userModel')

const authAdmin =  async (req,res,next) =>{

    try {
        // lấy thông tin user bằng id
        const user =  await Users.findOne({
            _id: req.user.id
        })
        if(user.role === 0)
        return res.status(400).json({msg: "Quyền truy cập admin bị từ chối"})
         
        next()
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
module.exports = authAdmin