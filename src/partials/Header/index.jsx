import { Link, NavLink, useLocation } from 'react-router-dom'

import './Header.css'

function Header() {
  return (
    <header className="header header--solid">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">SHOPIFY APP</Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <NavLink to="/customization" className="header__nav-link">
                Customization
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink to="/translations" className="header__nav-link">
                Translation
              </NavLink>
            </li>

            <li className="header__icon ">Đăng nhập/ Đăng ký</li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
