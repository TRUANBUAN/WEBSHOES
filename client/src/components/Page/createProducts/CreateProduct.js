import React, { useState, useContext, useEffect} from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import CategoriesAPI from '../../../api/CategoryAPI'
import Loading from "../uilts/loading/Loading"
import  {useHistory, useParams} from 'react-router-dom'


const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
    _id: ''
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)

    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()
    
    const [products,] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback,setCallback] = state.productsAPI.callback
    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id) {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])

    // tai anh len cloud
    const handleUpload = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("Bạn không phải là admin")
            const file = e.target.files[0]
            // console.log(file)
            if (!file) return alert("Tệp không tồn tại")

            if (file.size > 1024 * 1024)
                return alert("Tệp quá lớn")


            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return alert("Tệp sai định dạng")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })
            setLoading(false)

            setImages(res.data)

        }
        catch (err) {
            alert(err.response.data.msg)

        }
    }
    //xoa anh tren cloud vua chon
    const handleClear = async () => {
        try {
            if (!isAdmin) return alert("Bạn không phải là admin")
            await axios.post('/api/clear', { public_id: images.public_id }, {
                headers: { Authorization: token }

            })
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("Bạn không phải là admin")
            if (!images) return alert(" không có ảnh  tải lên")

            if(onEdit){
                await axios.put(`/api/products/${product._id}`, { ...product, images }, {
                    header: { Authorization: token }
                })
            }else{
                await axios.post('/api/products', { ...product, images }, {
                    header: { Authorization: token }
                })
            }      

            setCallback(!callback)
            history.push("/")

        } catch (err) {
            alert(err.response.data.msg)

        }
    }
    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                {
                    loading ? <div id="file_img"><Loading /></div>

                        : <div id="file_img" style={styleUpload}>
                            <span onClick={handleClear}>X</span>
                            <img src={images ? images.url : ''} alt="" />
                        </div>
                }

            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id ">ID</label>
                    <input type="text" name="product_id" id="product_id"
                        value={product.product_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="title ">Tên</label>
                    <input type="text" name="title" id="title"
                        value={product.title} row="5" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price"> Giá</label>
                    <input type="number" name="price" id="price"
                        value={product.price} row="7" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Mô tả</label>
                    <input type="text" name="description" id="description"
                        value={product.description} onChange={handleChangeInput} />
                </div>


                <div className="row">
                    <label htmlFor="content">Nội dung</label>
                    <input type="text" name="content" id="content"
                        value={product.content} onChange={handleChangeInput} />
                </div>


                <div className="row">
                    <label htmlFor="categories">Danh mục:</label>
                    <select name="category" value={product.category} onChange={handleChangeInput}>
                        <option value=""> Vui lòng chọn danh mục</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id} >
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>

                </div>
                <button type="submit">{onEdit ? "Cập nhật": "Tạo" }</button>
            </form>
        </div>
    )
}
export default CreateProduct