import './BackpackPal.css'
import AlternativeFooter from '../Footer/AlternativeFooter'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import SEO from '../SEO/SEO.jsx'

function BackpackPal() {
  const [activeImg, setActiveImg] = useState(null)

  const galleryImages = [
    "/backpack-pal-workshop/DSC_4399.jpeg",
    "/backpack-pal-workshop/DSC_4404.jpeg",
    "/backpack-pal-workshop/DSC_4410.jpeg",
    // "/backpack-pal-workshop/DSC_4399.jpeg",
    // "/alarm-bot-workshop/prizes_on_table.JPG",
    // "/backpack-pal-workshop/DSC_4399.jpeg",
  ]

  return (
    <>
      <SEO
        title="Backpack Pal Workshop for Schools | STEM Robotics Incursion NSW"
        description="Hands-on STEM robotics workshop where students build and program a Backpack Pal robot featuring a timetable display, joystick navigation, and Arduino coding. Curriculum-aligned incursion for NSW schools."
      />

      <div className="alarmbot-container">

        {/* HERO */}
        <div className="alarmbot-hero">
          <div className="alarmbot-hero-text">

            {/* small label stays non-heading (good) */}
            <span className="alarmbot-label">Workshop</span>

            <h1 className="alarmbot-title">
              Backpack Pal Workshop
            </h1>

            {/* CHANGE THE DESCRIPTION */}
            <p className="alarmbot-hero-description">
              The Backpack Pal is a robot designed and 3D printed in-house by our team. It conveniently clips onto the back of a student’s backpack and displays their school timetable. The bot has two main functions: a home screen which displays the current time and the upcoming period and a timetable screen wherein students can navigate their weekly timetable with a joystick. There is also a mounting slot on the top for students to customise their bot with a cute animal figurine.
            </p>
          </div>

          <div className="alarmbot-hero-media">
            <div className="alarmbot-media-box media-image">
              <img src="/backpack-pal-workshop/1782731276174.jpeg" />
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="alarmbot-details-grid">

          <div className="alarmbot-details-card">

            {/* FIX: section heading → H2 */}
            <h2>Workshop Details</h2>

            <ul>
              <li><strong>Price:</strong> $20 per student ($15 for low SES schools)</li>
              <li><strong>Duration:</strong> 2 hours</li>
              <li><strong>Year Levels:</strong> Years 7 - 10</li>
              <li><strong>School Requirements:</strong> See info pack</li>
            </ul>
          </div>

          <div className="alarmbot-details-card">

            {/* FIX: section heading → H2 */}
            <h2>Curriculum Links</h2>

            <p>This workshop supports learning in:</p>

            <ul>
              <li>Mandatory Technology (Years 7 - 8)</li>
              <li>iSTEM Elective (Years 9 - 10)</li>
              <li>Computing Technology Elective (Years 9 - 10)</li>
            </ul>

            <p className="alarmbot-note">
              Detailed learning outcomes are included in the Incursion Information Pack.
            </p>
          </div>

          <div className="alarmbot-details-card alarmbot-details-cta">

            {/* FIX: section heading → H2 */}
            <h2>Bring This Workshop to Your School</h2>

            <Link to="/enquire" className="alarmbot-cta-button">
              Enquire Now
            </Link>

            <a
              href="/backpack-pal-workshop/BACKPACK PAL WORKSHOP INCURSION PACK.pdf"
              download
              className="alarmbot-secondary-button"
              rel="noopener noreferrer"
            >
              Download Info Pack
            </a>
          </div>
        </div>

        {/* GALLERY */}
        <div className="alarmbot-gallery-section">

          {/* FIX: section heading → H2 */}
          <h2 className="alarmbot-gallery-title">
            Workshop Gallery
          </h2>

          <div className="alarmbot-gallery-grid">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="alarmbot-gallery-item"
                onClick={() => setActiveImg(img)}
              >
                <img src={img} alt={`Workshop ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* LIGHTBOX */}
      {activeImg && (
        <div className="alarmbot-lightbox" onClick={() => setActiveImg(null)}>
          <span className="alarmbot-lightbox-close">&times;</span>
          <img
            src={activeImg}
            alt="Workshop enlarged"
            className="alarmbot-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <AlternativeFooter />
    </>
  );
}

export default BackpackPal
