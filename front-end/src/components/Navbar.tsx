import { Link } from 'react-router-dom'
import { useConnection } from 'wagmi'
import { WalletOptions } from './WalletOptions'
import { Connection } from './Connection'
import '../styling/Navbar.css'

const Navbar = () => {
  const { address } = useConnection()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link">Home</Link>
      <Link to="/pageone" className="navbar-link">Subscribe</Link>
      <Link to="/pagetwo" className="navbar-link">Artists</Link>
      <Link to="/pagethree" className="navbar-link">Media Player</Link>
      
      <div>
        {address ? <Connection /> : <WalletOptions />}
      </div>
    </nav>
  )
}

export default Navbar