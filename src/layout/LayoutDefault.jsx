import { Outlet } from 'react-router-dom'
import Header from '../partials/Header'
import Footer from '../partials/Footer'

function LayoutDefault() {
  return (
    <>
      <Header />
      <main
        className="main"
        style={{
          marginTop: '50px',
          padding: '80px',
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default LayoutDefault
