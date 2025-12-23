import { Link, NavLink } from 'react-router-dom'
import './Header.css'
import { getCookie } from '../../helpers/cookie'

function Header() {
  const token = getCookie('token')

  return (
    <header className="app-header">
      <div className="app-header__inner">
        {/* Left Section - Navigation */}
        <div className="app-header__section app-header__section--left">
          <nav className="app-header__nav">
            <NavLink to="/customization" className="app-header__link">
              Customization
            </NavLink>
            <NavLink to="/translations" className="app-header__link">
              Translation
            </NavLink>
          </nav>
        </div>

        {/* Center Section - Brand */}
        <div className="app-header__section app-header__section--center">
          <Link to="/" className="app-header__brand">
            SHOPIFY APP
          </Link>
        </div>

        {/* Right Section - Auth */}
        <div className="app-header__section app-header__section--right">
          {token ? (
            <NavLink to="/logout" className="app-header__auth">
              logout
            </NavLink>
          ) : (
            <NavLink to="/login" className="app-header__auth">
              login/sign up
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
