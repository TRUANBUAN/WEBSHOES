const Category = require('../models/categoryModel')

const categoryController = {

    getCategories: async (req,res) =>{
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
            
        }
    
    },
    // nếu user role = 1 ----> admin
    // chỉ admin mới có quyền tạo
    createCategory:async (req,res) =>{
        try {
            
            const {name}= req.body;
            const category= await Category.findOne({name})

            if(category) return res.status(400).json({msg:'Danh mục này đã tồn.'})
            
            const newCategory = new Category({name})

            await newCategory.save()

            res.json({msg:'Tạo thành công 1 danh mục'})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
            
        }
    },
    // chỉ admin mới có quyền xóa
    deletedCategory: async (req,res) =>{
        try {
            await Category.findByIdAndDelete(req.params.id)

            res.json({msg:"Đã xóa 1 danh mục"})
        } catch (err) {

            return res.status(500).json({ msg: err.message })
            
        }
    },
    updateCategory: async (req,res) =>{
        try {
            const {name}= req.body;
            await Category.findOneAndUpdate({_id:req.params.id},{name})

            res.json({msg:"Đã cập nhật"})
        } catch (err) {

            return res.status(500).json({ msg: err.message })
            
        }
    }
}
module.exports = categoryController 