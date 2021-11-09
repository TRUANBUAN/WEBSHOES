import React, { useContext, useState, useEffect } from 'react'

import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../uilts/productitem/ProductItem'
function DetailProduct() {
    const params = useParams()

    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [detailProduct, setDetailProduct] = useState([])
    const addCart  =state.userAPI.addCart

    useEffect(() => {
        if (params) {
            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params, products])
    if (detailProduct.length === 0) return null;
    console.log(detailProduct)
    return (
        <>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />

                <div className="box-detail">
                    <h2>{detailProduct.title}</h2>
                </div>
                <span>${detailProduct.price} </span>
                <p>{detailProduct.description}</p>
                <p>{detailProduct.content}</p>
                <p>Sold: {detailProduct.sold}</p>
                <Link to="/cart" className="cart" 
                        onClick={() => addCart(detailProduct)}>
                    Buy Now</Link>


            </div>
            <div>
                <h2>Sản phâm tương tự</h2>
                <div className="products">
                    {
                            products.map(product =>{
                                return product.category===detailProduct.category
                                    ?<ProductItem key = {product._id} product = {product}/>:null
                            })
                    }
                </div>
            </div>
        </>
    )
}
export default DetailProduct
