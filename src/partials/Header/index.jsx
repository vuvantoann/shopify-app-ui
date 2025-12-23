import { Link, NavLink } from 'react-router-dom'
import './Header.css'
import { getCookie } from '../../helpers/cookie'

function Header() {
  const token = getCookie('token')

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
          </ul>
          <ul className="header__auth">
            <li className="header__nav-item ">
              {token ? (
                <>
                  <NavLink to="/logout" className="header__nav-link">
                    logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="header__nav-link">
                    login/sign up
                  </NavLink>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
