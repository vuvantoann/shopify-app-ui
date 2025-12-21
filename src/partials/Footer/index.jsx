import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__branding">
          <div className="footer__logo">SHOPIFY APP</div>
          <p>Powering your store with seamless experiences</p>
          <div className="footer__status">
            <span className="status-dot"></span>
            <span>All systems operational</span>
          </div>
        </div>

        <div className="footer__links">
          <div className="footer__column">
            <a href="#">Dashboard</a>
            <a href="#">Products</a>
            <a href="#">Orders</a>
            <a href="#">Customers</a>
            <a href="#">Analytics</a>
          </div>
          <div className="footer__column">
            <a href="#">Documentation</a>
            <a href="#">API Reference</a>
            <a href="#">Help Center</a>
          </div>
          <div className="footer__column">
            <a href="#">Shopify Admin</a>
            <a href="#">App Store</a>
            <a href="#">Developer Community</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2025 Shopify App. Built for merchants.</p>
        <div className="footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
