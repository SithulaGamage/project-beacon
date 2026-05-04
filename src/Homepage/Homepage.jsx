import './Homepage.css'
import SEO from '../SEO/SEO.jsx'

import { Link } from 'react-router-dom'
import { useEffect, useRef, useState, useCallback } from 'react'
import Footer from '../Footer/Footer.jsx'
import DarkVeil from '../components/DarkVeil.jsx'

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';

import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';

import StarBorder from '../components/StarBorder.jsx';
import ShinyText from '../components/ShinyText.jsx';
import SpotlightCard from '../components/SpotlightCard.jsx'

/* hooks unchanged */
function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

/* data unchanged */
const schoolsCardsData = [
  {
    title: (
      <>
        <span><ContentPasteRoundedIcon /></span>
        Risk Assessment Provided
      </>
    ),
    description: "Complete risk assessment documentation prepared for your school's approval process.",
  },
  {
    title: (
      <>
        <span><SecurityRoundedIcon /></span>
        Public Liability Insurance
      </>
    ),
    description: "Fully insured program with comprehensive public liability coverage for all activities.",
  },
  {
    title: (
      <>
        <span><CheckCircleRoundedIcon /></span>
        WWCC Compliance
      </>
    ),
    description: "All facilitators hold valid Working With Children Checks and relevant certifications.",
  },
];

const heroImages = [
  '/alarm-bot-workshop/DSC_4146.jpg',
  '/alarm-bot-workshop/computer_with_code_and_bot.JPG',
  '/alarm-bot-workshop/DSC_4223.jpg',
];

const spotlightColorHEX = '#d49b0040'

function Homepage() {
  const heroShowcaseRef = useScrollReveal()
  const sectionOneRef = useScrollReveal()
  const sectionTwoRef = useScrollReveal()

  return (
    <>
      {/* CHANGE THIS CODY */}
      <SEO
        title="Robotics High School Incursions | Project Beacon"
        description="Hands-on robotics incursions for NSW schools. Students build and program their own robot in an engaging STEM workshop."
      />

      <div className='dark-veil-background'>
        <DarkVeil />
      </div>

      <div className="homepage-container">

        {/* HERO */}
        <section className="homepage-hero-container">
          <div className="homepage-hero-badge">
            <RocketLaunchRoundedIcon style={{ fontSize: 16 }} />
            <span>Launching in NSW Schools</span>
          </div>

          <div className="homepage-hero-text-container">
            <h1 className="homepage-hero-title">
              Introducing Our New Workshop
            </h1>

            <p className="homepage-hero-subtitle">
              Students build and program their very own alarm bot with a customisable motion path and alarm tone.
            </p>

            <div className="homepage-hero-accent-line"></div>
          </div>

          <div className="homepage-hero-call-to-action-container">
            <Link to="/workshops/alarm-bot" className="homepage-hero-call-to-action-incursion-pack-button">
              <span>View Workshop Info</span>
              <ArrowForwardRoundedIcon />
            </Link>

            <StarBorder
              as="a"
              href="/alarm-bot-workshop/ALARM BOT WORKSHOP INCURSION PACK.pdf"
              download
              className="homepage-hero-call-to-action-enquire-now-button"
              color="white"
              speed="5s"
            >
              <DownloadRoundedIcon />
              <span>Download Info-Pack</span>
            </StarBorder>
          </div>

          <div className="homepage-hero-showcase scroll-reveal" ref={heroShowcaseRef}>
            {heroImages.map((img, index) => (
              <div className="homepage-hero-showcase-card" key={index}>
                <img src={img} alt={`Workshop moment ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>

        {/* WHAT IS PROJECT BEACON */}
        <section className='homepage-section main centered scroll-reveal' ref={sectionOneRef}>
          <h2 className='homepage-section-title centered'>
            What is Project Beacon?
          </h2>

          <div className='homepage-section-bubble'>
            Project Beacon delivers engaging robotics incursions for NSW schools, bringing the world of STEM directly into the hands of young student innovators. Our workshops have been diligently aligned to NESA's cirruculum, teaching students the fundamentals of robotics, from 3D-printing through to programming and testing. Each session is built around students creating their own robot to take home, encouraging continued experimentation and learning post-workshop. 
          </div>
        </section>

        {/* SCHOOLS SECTION */}
        <section className='homepage-section secondary scroll-reveal' ref={sectionTwoRef}>
          <h2 className='homepage-section-title centered'>
            Hassle-Free for Schools
          </h2>

          <p className='homepage-section-subtitle'>
            We handle every compliance, safety, and logistical requirement so you can focus on providing amazing opportunities for your students.
          </p>

          <div className='homepage-section-cards'>
            {schoolsCardsData.map((card, index) => (
              <SpotlightCard
                key={index}
                className="homepage-section-card"
                spotlightColor={spotlightColorHEX}
              >
                <div className='homepage-section-card-icon-glow'></div>

                <h3 className='homepage-section-card-title'>
                  {card.title}
                </h3>

                <div className='homepage-section-card-description'>
                  {card.description}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </>
  )
}

export default Homepage;
