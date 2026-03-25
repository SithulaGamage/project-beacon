import './Homepage.css'

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

/* ─── scroll reveal hook ─── */
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

/* ─── animated counter hook ─── */
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  const start = useCallback(() => {
    if (started) return
    setStarted(true)

    const startTime = performance.now()
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, started])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start()
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [start])

  return { ref, count }
}

/* ─── data ─── */
const projectBeaconCardsData = [
  {
    title: (
      <>
        <span>
          <SchoolRoundedIcon />
        </span>
        Accessible to All
      </>
    ),
    description:
      "No experience needed. We guide students step-by-step from basics to building a working robot. Designed for mixed-ability classrooms so every student can succeed.",
  },
  {
    title: (
      <>
        <span>
          <SettingsRoundedIcon />
        </span>
        Real Engineering Skills
      </>
    ),
    description:
      "Students learn how real systems work through coding, circuits, sensors, and mechanical design. Practical skills used in real engineering, not just theory.",
  },
  {
    title: (
      <>
        <span>
          <StarRoundedIcon />
        </span>
        Equity & Inspiration
      </>
    ),
    description:
      "Every student builds and keeps their own functional robot. We remove cost and access barriers so all students can experience creating technology.",
  }
];

const schoolsCardsData = [
  {
    title: (
      <>
        <span>
          <ContentPasteRoundedIcon />
        </span>
        Risk Assessment Provided
      </>
    ),
    description:
      "Complete risk assessment documentation prepared for your school's approval process.",
  },
  {
    title: (
      <>
        <span>
          <SecurityRoundedIcon />
        </span>
        Public Liability Insurance
      </>
    ),
    description:
      "Fully insured program with comprehensive public liability coverage for all activities.",
  },
  {
    title: (
      <>
        <span>
          <CheckCircleRoundedIcon />
        </span>
        WWCC Compliance
      </>
    ),
    description:
      "All facilitators hold valid Working With Children Checks and relevant certifications.",
  },
];

const statsData = [
  { icon: <PeopleRoundedIcon />, value: 200, suffix: '+', label: 'Students Taught' },
  { icon: <BusinessRoundedIcon />, value: 15, suffix: '+', label: 'Schools Reached' },
  { icon: <EmojiEventsRoundedIcon />, value: 100, suffix: '%', label: 'Satisfaction Rate' },
];

const heroImages = [
  '/alarm-bot-workshop/DSC_4146.jpg',
  '/alarm-bot-workshop/computer_with_code_and_bot.JPG',
  '/alarm-bot-workshop/DSC_4223.jpg',
];

const spotlightColorHEX = '#d49b0040'

/* ─── stat counter component ─── */
function StatItem({ icon, value, suffix, label }) {
  const { ref, count } = useCountUp(value, 2000)

  return (
    <div className="homepage-stat-item" ref={ref}>
      <div className="homepage-stat-icon">{icon}</div>
      <div className="homepage-stat-value">{count}{suffix}</div>
      <div className="homepage-stat-label">{label}</div>
    </div>
  )
}

/* ─── homepage ─── */
function Homepage() {
  const heroShowcaseRef = useScrollReveal()
  const sectionOneRef = useScrollReveal()
  const statsRef = useScrollReveal()
  const sectionTwoRef = useScrollReveal()

  return (
    <>
      {/* dark veil background */}
      <div className='dark-veil-background'>
        <DarkVeil />
      </div>

      <div className="homepage-container">
        {/* hero section */}
        <div className="homepage-hero-container">
          {/* badge */}
          <div className="homepage-hero-badge">
            <RocketLaunchRoundedIcon style={{ fontSize: 16 }} />
            <span>Launching in NSW Schools</span>
          </div>

          {/* text */}
          <div className="homepage-hero-text-container">
            <div className="homepage-hero-title">Introducing Our New Workshop </div>
            <div className="homepage-hero-subtitle">Students build and program their very own alarm bot with a customisable motion path and alarm tone.
            </div>
            <div className="homepage-hero-accent-line"></div>
          </div>

          {/* call to action */}
          <div className="homepage-hero-call-to-action-container">
            <Link to="/workshops/alarm-bot" className="homepage-hero-call-to-action-incursion-pack-button">
              <span>View Workshop Info</span>
              <ArrowForwardRoundedIcon />
            </Link>

            <StarBorder
              href="/info-pack.pdf"
              download
              className="homepage-hero-call-to-action-enquire-now-button"
              color="white"
              speed="5s"
            >
              <DownloadRoundedIcon />
              <span>Download Info-Pack</span>
            </StarBorder>
          </div>

          {/* hero image showcase */}
          <div className="homepage-hero-showcase scroll-reveal" ref={heroShowcaseRef}>
            {heroImages.map((img, index) => (
              <div className="homepage-hero-showcase-card" key={index}>
                <img src={img} alt={`Workshop moment ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* 'what is project beacon' section */}
        <div className='homepage-section main centered scroll-reveal' ref={sectionOneRef}>
          {/* text */}
          <div className='homepage-section-title centered'>What is Project Beacon?</div>
          <div className='homepage-section-bubble'>
            Project Beacon’s goal is to bring the world of STEM directly into the hands of young student innovators. Our interactive, curriculum-aligned workshops aim to teach students the fundamentals of robotics, from manufacturing through to programming and testing. Our workshops are built around students creating robots they can take home, inspiring continual experimentation and future learning.
          </div>


        </div>


        {/* 'what's in it for you' section */}
        <div className='homepage-section secondary scroll-reveal' ref={sectionTwoRef}>
          {/* text */}
          <div className='homepage-section-title centered'>Hassle-Free for Schools</div>
          <div className='homepage-section-subtitle'>
            We handle every compliance, safety, and logistical requirement so you can focus on providing amazing opportunities for your students.
          </div>

          {/* feature cards */}
          <div className='homepage-section-cards'>
            {schoolsCardsData.map((card, index) => (
              <SpotlightCard
                key={index}
                className="homepage-section-card"
                spotlightColor={spotlightColorHEX}
              >
                <div className='homepage-section-card-icon-glow'></div>
                <div className='homepage-section-card-title'>{card.title}</div>
                <div className='homepage-section-card-description'>{card.description}</div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </>
  )
}

export default Homepage;
