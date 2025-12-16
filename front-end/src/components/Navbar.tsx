import { Link } from 'react-router-dom'
import '../styling/Navbar.css'


const Navbar = () => {
  return (

    <nav className="navbar">

      <Link to="/"         className="navbar-link">Home</Link>
      <Link to="/pageone"   className="navbar-link">Page One</Link>
      <Link to="/pagetwo"   className="navbar-link">Page Two</Link>
      <Link to="/pagethree" className="navbar-link">Page Three</Link>

    </nav>

  )
}

export default Navbar