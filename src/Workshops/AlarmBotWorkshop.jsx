import './AlarmBotWorkshop.css'
import AlternativeFooter from '../Footer/AlternativeFooter'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function AlarmBot() {
  const [activeImg, setActiveImg] = useState(null)

  const galleryImages = [
    "/alarm-bot-workshop/DSC_4146.jpg",
    // "/alarm-bot-workshop/DSC_4149.jpg",
    // "/alarm-bot-workshop/DSC_4173.jpg",
    "/alarm-bot-workshop/DSC_4223.jpg",
    "/alarm-bot-workshop/computer_with_code_and_bot.JPG",
    "/alarm-bot-workshop/DSC_4179.jpg",
    "/alarm-bot-workshop/prizes_on_table.JPG",
    "/alarm-bot-workshop/DSC_4182.jpg",
    // "/alarm-bot-workshop/DSC_4176.jpg",
  ]

  return (
    <>
      <div className="alarmbot-container">

        {/* HERO */}
        <div className="alarmbot-hero">
          <div className="alarmbot-hero-text">
            <span className="alarmbot-label">Workshop</span>
            <h1 className="alarmbot-title">Alarm Bot Workshop</h1>
            <p className="alarmbot-hero-description">
              The Alarm Bot is a robot designed and 3D printed in-house by our team. While it includes all the similar functions of a typical alarm clock - a screen and buzzer -
              it also features two motorised wheels to drive across the room. Students in this workshop will learn about the 3D printing manufacturing process, circuitry, electrical
              components and the Arduino coding language. The workshop will conclude with a fun trivia session after which students can take their bots home.
            </p>
          </div>

          <div className="alarmbot-hero-media">
            <div className="alarmbot-media-box media-image">
              <img src="/alarm-bot-workshop/DSC_4171.jpg" />
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="alarmbot-details-grid">
          <div className="alarmbot-details-card">
            <h3>Workshop Details</h3>
            <ul>
              <li><strong>Price:</strong> Contact for quote</li>
              <li><strong>Duration:</strong> 90 - 120 minutes</li>
              <li><strong>Year Levels:</strong> Years 7 - 10</li>
            </ul>
          </div>

          <div className="alarmbot-details-card">
            <h3>Curriculum Links</h3>
            <p>This workshop supports learning in:</p>
            <ul>
              <li>Digital Technologies</li>
              <li>Design & Technologies</li>
              <li>STEM & Engineering Pathways</li>
            </ul>
            <p className="alarmbot-note">
              Detailed learning outcomes are included in the Incursion Information Pack.
            </p>
          </div>

          <div className="alarmbot-details-card alarmbot-details-cta">
            <h3>Bring This Workshop to Your School</h3>
            <Link to="/get-started" className="alarmbot-cta-button">Enquire Now</Link>
            <a
              href="/downloads/"
              download
              className="alarmbot-secondary-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Info Pack
            </a>
          </div>
        </div>

        {/* GALLERY */}
        <div className="alarmbot-gallery-section">
          <h2 className="alarmbot-gallery-title">Workshop Gallery</h2>

          <div className="alarmbot-gallery-grid">
            {galleryImages.map((img, index) => (
              <div key={index} className="alarmbot-gallery-item" onClick={() => setActiveImg(img)}>
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
  )
}

export default AlarmBot
