import { Outlet } from 'react-router-dom'
import Header from '../partials/Header'
import Footer from '../partials/Footer'

function LayoutDefault() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default LayoutDefault
