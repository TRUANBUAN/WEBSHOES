const Products = require('../models/productModel')

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = lớn hơn hoặc bằng
    //    lte = nhỏ hơn hoặc bằng
    //    lt = ít hơn
    //    gt = lớn hơn
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productController = {
//Lấy thông tin sản phẩm
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find(),req.query)
            .filtering().sorting().paginating()
            const products = await features.query
            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
         
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
//tạo sản phẩm
    createProducts: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;
            if (!images)
                return res.status(400).json({ msg: "Không có ảnh để tải" })

            const product = await Products.findOne({ product_id })
            if (product)
                return res.status(400).json({ msg: "Ảnh đã tồn tại" })

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            })
            await newProduct.save()
            res.json("Sản phẩm đã được tạo")
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
//xóa sản phẩm
    deleteProducts: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json("Sản phẩm đã được xóa")
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
//update sản phẩm
    updateProducts: async (req, res) => {
        try {
            const { title, price, description, content, images, category, checked } = req.body;
            if (!images)
                return res.status(400).json({ msg: "Không có ảnh để tải" })
            await Products.findOneAndUpdate({_id:req.params.id},{
                 title: title.toLowerCase(), price, description, content, images, category

            })
            res.json({msg:"Cập nhật thành công"})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


module.exports = productController