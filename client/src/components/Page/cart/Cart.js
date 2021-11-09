import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import "./Cart.css"
import axios from 'axios'
import PaypalButton from './PaypalButton'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)
            setTotal(total)
        }
        getTotal()
    }, [cart])


    const addToCart = async ()=>{
        await axios.patch('/user/addcart', {cart},{
            headers: {Authorization: token}
        })
    }




    const tang = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart()
    }
    const giam = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart()

    }
    const xoaSanpham = id => {
        if (window.confirm("Bạn muốn xóa sản phẩm này ?")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)


        }
    }

    const tranSuccess =async (payment) =>{

        console.log(payment)
        const {paymentID,address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address},{
            headers:{Authorization:token}
        })

        setCart([])
        addToCart()
        alert("Bạn đã đặt hàng thành công")

    }

    return (
        <div>
            {
                cart.map(product => (
                    <div className="detail cart" key={product._id} >
                        <div className="delete" onClick={() => xoaSanpham(product._id)}> X  </div>
                        <img src={product.images.url} alt="" />

                        <div className="box-detail">
                            <div className="row">
                                <h2>{product.tiltle}</h2>
                                <h6>id: {product.product_id}</h6>

                            </div>

                            <span> ${product.price * product.quantity}</span>
                            <p>{product.description}</p>
                            <p>{product.content}</p>
                            <div className="amount">
                                <button onClick={() => giam(product._id)}> - </button>

                                <span>{product.quantity}</span>

                                <button onClick={() => tang(product._id)} > + </button>
                            </div>

                        </div>

                    </div>


                ))

            }
            <div className="total">
                <h3>Total: ${total}</h3>
                <PaypalButton
                total = {total}
                tranSuccess = {tranSuccess}  />
            </div>


        </div>
    )
}
export default Cart
