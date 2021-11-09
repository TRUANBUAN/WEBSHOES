import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { GlobalState } from '../../GlobalState'
import Menu from './icon/bars.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import axios from 'axios'

function Header() {

    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged

    const [isAdmin] = state.userAPI.isAdmin

    const [cart] = state.userAPI.cart

    const logoutUser = async () => {
        await axios.get('user/logout') 
        localStorage.clear()
        window.location.href = "/";
    }

    const adminRouter = () => {
        return (
            <>
                <li><Link to='/create_product'>Tạo sản phẩm</Link></li>
                <li><Link to='/category'>Danh mục</Link></li>

            </>
        )
    }
    const loggedRouter = () => {
        return (
            <>
                <li><Link to='/history'>Lịch sử</Link></li>
                <li><Link to='/' onClick={logoutUser}>Đăng xuất</Link></li>

            </>
        )
    }
    return (
        <header>
            <div className="Menu">
                <img src={Menu} alt="" width="30"></img>
            </div>
            <div className="Logo">
                <Link to="/" >{isAdmin ? 'Admin' : 'Truan Buan'}</Link>
            </div>
            <ul>


                <li>
                    <Link to="/" >{isAdmin ? 'Sản phẩm' : 'Shop'}</Link>
                </li>

                <li>
                    <Link to="/contract" >{isAdmin ? '' : 'Liên hệ'}</Link>
                </li>
                <li>
                    <Link to="/about" >{isAdmin ? '' : 'Về chúng tôi'}</Link>
                </li>
                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : <li><Link to='/login'>Đăng nhập</Link></li>
                }
                <li>
                    <img src={Close} alt="" width="30" className="Menu"></img>
                </li>
            </ul>

            {
                isAdmin ? ''
                    : <div className="cart-icon">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                            <img src={Cart} alt="" width="30"></img>
                        </Link>
                    </div>
            }
        </header>
    )
}

export default Header