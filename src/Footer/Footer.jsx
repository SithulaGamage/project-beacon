import './Footer.css'
import { Link } from 'react-router-dom'
import AlternativeFooter from './AlternativeFooter.jsx'

import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import StarBorder from '../components/StarBorder.jsx'

function Footer() {
  return (
    <div className='homepage-footer-container'>
      {/* CTA section */}
      <div className='homepage-footer-cta-section'>
        <div className='homepage-footer-cta-title'>Let's collaborate together for the next big workshop</div>

        <StarBorder
          as={Link}
          to="/get-started"
          className="homepage-footer-contact-button"
          color="white"
          speed="5s"
        >
          <EmailRoundedIcon />
          <span className='contact-link'>Contact Us</span>
        </StarBorder>
      </div>

      <AlternativeFooter />
    </div>
  )
}

export default Footer
