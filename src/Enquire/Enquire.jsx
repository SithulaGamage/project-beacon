import './Enquire.css'
import { useRef } from 'react'
import emailjs from 'emailjs-com'

import AlternativeFooter from '../Footer/AlternativeFooter'

import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded'

function Enquire() {
  const formRef = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'YOUR_SERVICE_ID',     // 🔴 replace
        'YOUR_TEMPLATE_ID',    // 🔴 replace
        formRef.current,
        'YOUR_PUBLIC_KEY'      // 🔴 replace
      )
      .then(() => {
        alert('Enquiry sent successfully!')
        formRef.current.reset()
      })
      .catch(() => {
        alert('Something went wrong. Please try again.')
      })
  }

  return (
    <>
      {/* main container */}
      <div className="enquire-container">
        {/* header */}
        <div className="enquire-header">
          <h1 className="enquire-title">Enquire About a Workshop</h1>
          <p className="enquire-subtitle">
            Complete the form below and we'll get back to you within 24 hours with availability, pricing confirmation, and next steps.
          </p>
        </div>

        {/* main layout */}
        <div className="enquire-content">
          {/* form */}
          <form className="enquire-form" ref={formRef} onSubmit={sendEmail}>
            <div className="enquire-grid">
              <div className="enquire-field">
                <label>School Name *</label>
                <input type="text" name="school_name" required />
              </div>

              <div className="enquire-field">
                <label>Your Name *</label>
                <input type="text" name="name" required />
              </div>

              <div className="enquire-field">
                <label>Email Address *</label>
                <input type="email" name="email" required />
              </div>

              <div className="enquire-field">
                <label>Phone Number</label>
                <input type="tel" name="phone" />
              </div>

              <div className="enquire-field">
                <label>Year Level *</label>
                <select name="year_level" required>
                  <option value="Year 7">Year 7</option>
                  <option value="Year 8">Year 8</option>
                  <option value="Year 9">Year 9</option>
                  <option value="Year 10">Year 10</option>
                  <option value="Mixed Years">Mixed Years</option>
                </select>
              </div>

              <div className="enquire-field">
                <label>Number of Students *</label>
                <input type="number" name="students" required />
              </div>
            </div>

            <div className="enquire-field full">
              <label>Preferred Date / Term</label>
              <input
                type="text"
                name="preferred_date"
                placeholder="e.g. Term 2, Week 5"
              />
            </div>

            <div className="enquire-field full">
              <label>Additional Information</label>
              <textarea name="message" rows="5" />
            </div>

            <button type="submit" className="enquire-submit">
              Submit Enquiry
            </button>
          </form>

          {/* sidebar */}
          <div className="enquire-sidebar">
            <div className="enquire-info-card">
              <h3>Contact Information</h3>

              <div className="enquire-info-item">
                <EmailRoundedIcon />
                <div>
                  <span>Email</span>
                  <p>hello@projectbeacon.edu.au</p>
                </div>
              </div>

              <div className="enquire-info-item">
                <PhoneRoundedIcon />
                <div>
                  <span>Phone</span>
                  <p>+61 433 035 707</p>
                  <p>+61 433 035 707</p>
                </div>
              </div>

              <div className="enquire-info-item">
                <LocationOnRoundedIcon />
                <div>
                  <span>Service Area</span>
                  <p>Sydney & Greater Sydney</p>
                </div>
              </div>
            </div>

            <div className="enquire-quick-card">
              <div className="enquire-quick-title">
                <ElectricBoltRoundedIcon />
                <span>Quick Response</span>
              </div>

              <p>
                We typically respond within 24 hours with availability and next steps.
              </p>

              <div className="enquire-availability">
                <span className="dot"></span>
                Team available Mon-Fri, 9am-5pm AEST
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <AlternativeFooter />
    </>
  )
}

export default Enquire
