import React from 'react'
import { Link } from 'react-router-dom'

function RelatedProducts({product}) {
    return (
        <div className="row-btn">
            <Link id="btn_buy" to="#!">Mua</Link>
            <Link id="btn_view" to={`/detail/${product._id}`}>Xem</Link>

        </div>

    )
}
export default RelatedProducts
