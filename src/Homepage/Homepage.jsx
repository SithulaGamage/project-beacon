import './Homepage.css'
import SEO from '../SEO/SEO'
import Footer from '../Footer/Footer'
import DarkVeil from '../components/DarkVeil'

import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded'
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded'
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded'
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded'
import AlternativeFooter from '../Footer/AlternativeFooter'

function useScrollReveal() {
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
      { threshold: 0.15 }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return ref
}

const trust = [
  {
    icon: <SecurityRoundedIcon />,
    title: 'WWCC Certified'
  },
  {
    icon: <WorkspacePremiumRoundedIcon />,
    title: 'Fully Insured'
  },
  {
    icon: <CheckCircleRoundedIcon />,
    title: 'Risk Assessments'
  }
]

const heroImages = [
  "/alarm-bot-workshop/BCH2.jpeg",
  "/alarm-bot-workshop/DSC_4146.jpg",
  "/alarm-bot-workshop/DSC_4223.jpg",
  "/alarm-bot-workshop/BCH3.jpeg",
]

function Homepage() {
  const heroRef = useScrollReveal()
  const featureRef = useScrollReveal()
  const showcaseRef = useScrollReveal()
  const notForProfitReft = useScrollReveal()
  const newWorkshopRef = useScrollReveal()
  const trustRef = useScrollReveal()
  const ctaRef = useScrollReveal()


  const [currentHeroImage, setCurrentHeroImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <SEO
        title="Project Beacon | Robotics Incursions"
        description="Hands-on robotics incursions where students build, code and take home their own robot."
      />

      <main className="homepage">

        {/* HERO */}

        <section className="hero">

          <div className="hero-image">

            <img
              className="hero-slide active"
              src={heroImages[currentHeroImage]}
              alt="Students participating in a Project Beacon robotics workshop"
            />

            <div className="hero-overlay" />

            <div
              className="hero-content scroll-reveal"
              ref={heroRef}
            >

              <h1>
                High School Robotics Incursions
              </h1>

              <p>
                Students build, code, test, and take home their own robot through a fun classroom workshop built for curious young makers.
              </p>

              <div className="hero-buttons">

                <Link
                  to="/workshops"
                  className="primary-button"
                >
                  View Workshops
                </Link>

                <Link
                  to="/enquire"
                  className="secondary-button"
                >
                  Book an Incursion
                  <ArrowForwardRoundedIcon />
                </Link>

              </div>

            </div>

          </div>

        </section>

        {/* FEATURES */}

        <section
          className="paths scroll-reveal"
          ref={featureRef}
        >

          <div className="paths-heading">

            <div>

              <h2>
                Three ways students enter robotics.
              </h2>

              <p>
                Build it, understand it, then keep experimenting after the workshop.
              </p>

            </div>

          </div>

          <div className="paths-grid">

            <article className="path-card">

              <span className="roman">
                I
              </span>

              <h3>Educate.</h3>

              <p>
                Students are educated on the fundamentals required to build a robot. This includes the 3D printing process to make the robot chassis, the workings and wiring of electrical components and the Arduino skills necessary to make their bot functional.
              </p>

            </article>

            <article className="path-card">

              <span className="roman">
                II
              </span>

              <h3>Empower.</h3>

              <p>
                Students are empowered to tackle robotics with a hands-on building and programming experience that replicates the troubleshooting and testing environment present in real-world engineering industries.
              </p>

            </article>

            <article className="path-card">

              <span className="roman">
                III
              </span>

              <h3>Instill.</h3>

              <p>
                Students are instilled with a lasting curiosity for STEM through a concluding industry-focused Q&A session, alongside the opportunity to bring their robot home for continued experimentation.
              </p>

            </article>

          </div>

        </section>

        {/* SHOWCASE */}

        <section
          className="showcase scroll-reveal"
          ref={showcaseRef}
        >

          <div className="showcase-image">

            <img
              // src="/alarm-bot-workshop/DSC_4223.jpg"
              src="/alarm-bot-workshop/DSC_4146.jpg"
              alt=""
            />

          </div>

          <div className="showcase-content">

            {/* <span>OUR MISSION</span> */}

            <h2>
              Our Mission
            </h2>

            <p>
              Project Beacon is a not-for-profit organisation based in Sydney whose goal is to bring the world of STEM directly into the hands of young student innovators. All our presenters are current university students pursuing STEM degrees, allowing them to provide an engaging and relatable learning experience for each student.
            </p>
            <br></br>
            <p>
              Our interactive and curriculum-aligned workshops aim to teach students the fundamentals of robotics, from manufacturing through to programming and testing. Each workshop is built around students creating robots they can take home, inspiring continual experimentation and future learning.
            </p>

          </div>

        </section>
        
        <section
          className="showcase scroll-reveal"
          ref={notForProfitReft}
        >

          <div className="showcase-content">

            <h2>
              Not-For-Profit
            </h2>

            <p>
              Built to make STEM more accessible.
            </p>
            <br/>
            <p>
              Our prices are governed by our not-for-profit initiative. Workshop prices only cover the supply costs for each robot and the workshop setup. There are no labour costs attached. Our ultimate goal is to bring free STEM workshops to low-socioeconomic and all-girl schools around Sydney.
            </p>

          </div>

          <div className="showcase-image">

            <img
              src="/alarm-bot-workshop/DSC_4223.jpg"
              alt="Students during robotics workshop"
            />

            <div className="acnc-badge">
              <img
                src="/logo/ACNC_logo.png"
                alt="Registered ACNC Charity"
              />
            </div>

          </div>

        </section>

        <section
          className="workshop-cta scroll-reveal"
          ref={newWorkshopRef}
        >

          <h2>
            New Backpack Pal Workshop
          </h2>

          <p>
            A practical robotics incursion where students build, code, customise, and test their own robot in one classroom-ready experience.
          </p>

          <Link
            to="/workshops/backpack-pal"
            className="primary-button"
          >
            View Workshop
          </Link>

        </section>

        {/* TRUST */}

        <section
          className="trust scroll-reveal"
          ref={trustRef}
        >

          <div className="section-heading">

            <span>READY FOR SCHOOLS</span>

            <h2>
              Everything prepared for a seamless incursion.
            </h2>

          </div>

          <div className="trust-grid">

            {trust.map((item) => (

              <article
                className="trust-card"
                key={item.title}
              >

                <div className="trust-icon">

                  {item.icon}

                </div>

                <h3>{item.title}</h3>

              </article>

            ))}

          </div>

        </section>

        {/* CTA */}

        <section
          className="final-cta scroll-reveal"
          ref={ctaRef}
        >

          <h2>
            Ready to inspire your students?
          </h2>

          <p>
            Let's bring a classroom full of robotics, creativity and engineering directly to your school.
          </p>

          <Link
            to="/enquire"
            className="primary-button"
          >
            Enquire Today
          </Link>

        </section>

      </main>

      {/* <Footer /> */}
      <AlternativeFooter />

    </>
  )
}

export default Homepage