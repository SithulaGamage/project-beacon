import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar-container'>
      {/* logo */}
      <Link to="/" className='navbar-logo-container'>
        <div className='navbar-logo-text'>Project Beacon</div>
      </Link>

      {/* main links */}
      <div className='navbar-main-links-container'>

        {/* Workshops dropdown */}
        <div className="navbar-dropdown">
          <Link to="/workshops" className='navbar-main-link'>
            Workshops
          </Link>

          <div className="navbar-dropdown-menu">
            <Link to="/workshops/alarm-bot" className="navbar-dropdown-item">
              Alarm Bot
            </Link>
          </div>
        </div>

        <Link to="/our-mission" className='navbar-main-link'>Our Mission</Link>
        <Link to="/our-team" className='navbar-main-link'>Our Team</Link>
        <Link to="/resources" className='navbar-main-link'>Resources</Link>
      </div>

      {/* call to action */}
      <Link to="/get-started" className='navbar-call-to-action-link-container'>
        <div className='navbar-call-to-action-link-text'>Get Started</div>
      </Link>
    </div>
  )
}

export default Navbar
