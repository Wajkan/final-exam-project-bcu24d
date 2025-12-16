import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import '../styling/Layout.css'

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}




export default Layout