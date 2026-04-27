import './Navbar.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  return (
    <>
      {/* NAV LANDMARK ADDED */}
      <nav className='navbar-container' aria-label="Main Navigation">

        {/* logo (site identity) */}
        <Link to="/" className='navbar-logo-container' aria-label="Project Beacon Home">
          <img
            src="/logo/pb.png"
            alt="Project Beacon Logo"
            className="navbar-logo-image"
          />

          {/* semantic improvement: keep text but mark as site name */}
          <span className='navbar-logo-text'>Project Beacon</span>
        </Link>

        {/* desktop links */}
        <div className='navbar-main-links-container'>
          <Link to="/workshops" className='navbar-main-link'>
            Workshops
          </Link>

          {/* <Link to="/our-mission" className='navbar-main-link'>Our Mission</Link> */}

          <Link to="/resources" className='navbar-main-link'>
            Resources
          </Link>
        </div>

        {/* CTA */}
        <Link
          to="/enquire"
          className='navbar-call-to-action-link-container'
          aria-label="Book a Workshop"
        >
          <span className='navbar-call-to-action-link-text'>
            Book Now
          </span>
        </Link>

        {/* hamburger */}
        <button
          className={`navbar-hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </nav>

      {/* overlay */}
      <div
        className={`navbar-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* mobile menu */}
      <div className={`navbar-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/workshops" onClick={() => setMenuOpen(false)}>
          Workshops
        </Link>

        {/* <Link to="/our-mission" onClick={() => setMenuOpen(false)}>
          Our Mission
        </Link> */}

        <Link to="/resources" onClick={() => setMenuOpen(false)}>
          Resources
        </Link>

        <Link
          to="/get-started"
          className="mobile-cta"
          onClick={() => setMenuOpen(false)}
        >
          Book Now
        </Link>
      </div>
    </>
  )
}

export default Navbar
