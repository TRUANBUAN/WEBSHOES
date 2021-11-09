const router = require('express').Router()

//Cloundinary
const cloudinary = require('cloudinary')

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')
// config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
// tải ảnh lên cloudinary
router.post('/upload',auth,authAdmin, (req, res) => {
    try {

        console.log(req.files)
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json(" File không được upload")

        const file = req.files.file;

        if (file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: " Kích thước ảnh quá lớn" })
        }


        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: " sai định dạng file" })
        }


        //cloudinary.v2.uploader.upload(file, options, callback);
        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "imageshoes" }, async (err, result) => {
            if (err)
                return res.status(500).json({ msg: err.message })
            removeTmp(file.tempFilePath)
            res.json({
                public_id: result.public_id,
                url: result.secure_url
            })
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})
// xóa ảnh 
router.post('/clear',auth,authAdmin, (req, res) => {
    try {
        const { public_id } = req.body;
        if (!public_id)
            return res.status(400).json({ msg: "Chưa chọn ảnh" })
        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err;

            res.json({ msg: "Ảnh đã được xóa" })

        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})
const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })

}
module.exports = router

