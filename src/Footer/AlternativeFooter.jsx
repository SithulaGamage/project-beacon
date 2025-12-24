import './AlternativeFooter.css'
import { Link } from 'react-router-dom'

import EmailRoundedIcon from '@mui/icons-material/EmailRounded'

function AlternativeFooter() {
  return (
    <div className='alternative-footer-container'>
      {/* main info section */}
      <div className='alternative-footer-main-block'>
        <div className='alternative-footer-brand-section'>
          <div className='alternative-footer-brand-logo'>
            <div className='alternative-footer-logo-icon'></div>
            <span>Project Beacon</span>
          </div>

          <p className='alternative-footer-brand-description'>
            Bringing accessible, high-quality robotics education to Australian high schools.
            Hands-on Arduino coding, 3D printing, and real engineering skills for Years 7–10.
          </p>

          <a
            href="mailto:hello@projectbeacon.edu.au"
            className='alternative-footer-email'
          >
            <EmailRoundedIcon />
            hello@projectbeacon.edu.au
          </a>
        </div>

        <div className='alternative-footer-links-section'>
          <div className='alternative-footer-links-column'>
            <h3>Navigation</h3>
            <Link to="/workshops">Workshops</Link>
            <Link to="/our-mission">Our Mission</Link>
            <Link to="/our-team">Our Team</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/get-started">Enquire</Link>
          </div>

          <div className='alternative-footer-links-column'>
            <h3>Information</h3>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/compliance">Safety & Compliance</Link>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className='alternative-footer-bottom'>
        <p>© 2025 Project Beacon. All rights reserved.</p>
        <p className='alternative-footer-badges'>
          NSW Curriculum Aligned · Fully Insured · WWCC Compliant
        </p>
      </div>
    </div>
  )
}

export default AlternativeFooter
