import React from 'react'
import './Footer.css'
export default function footer() {
  return (
    <footer>
      <div className="container">

        <div className="noi-dung about">
          <h2>Về Chúng Tôi</h2>
          <p>Shop của Trương Bảo Thuận</p>
          <ul className="social-icon">
            <li><a href="https://www.facebook.com/thuan.truongbao.3/"><i className="fa fa-facebook"></i></a></li>
            <li><a href=""><i className="fa fa-twitter"></i></a></li>
            <li><a href="https://www.instagram.com/truanbuan/"><i className="fa fa-instagram"></i></a></li>
            <li><a href=""><i className="fa fa-youtube"></i></a></li>
          </ul>
        </div>


        <div className="noi-dung links">
          <h2>Đường Dẫn</h2>
          <ul>
            <li><a href="#">Trang Chủ</a></li>
            <li><a href="#">Về Chúng Tôi</a></li>
            <li><a href="#">Thông Tin Liên Lạc</a></li>
            <li><a href="#">Dịch Vụ</a></li>
            <li><a href="#">Điều Kiện Chính Sách</a></li>
          </ul>
        </div>

        <div className="noi-dung contact">
          <h2>Thông Tin Liên Hệ</h2>
          <ul className="info">
            <li>
              <span><i className="fa fa-map-marker"></i></span>
              <span>27 An Dương Vương<br />
                Mang Thít, Vĩnh Long<br />
                Việt Nam</span>
            </li>
            <li>
              <span><i className="fa fa-phone"></i></span>
              <p><a href="#">+84 934 161 407</a>
                </p>
            </li>
            <li>
              <span><i className="fa fa-envelope"></i></span>
              <p><a href="#">truongbaothuan131199@gmail.com</a></p>
            </li>
            <li>
              <form className="form">
                <input type="email" className="form__field" placeholder="Đăng Ký Subscribe Email" />
                <button type="button" className="btn btn--primary  uppercase">Gửi</button>
              </form>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  )
}
