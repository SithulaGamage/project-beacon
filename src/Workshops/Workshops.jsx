import './Workshops.css'
import AlternativeFooter from '../Footer/AlternativeFooter'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import AlarmOnRoundedIcon from '@mui/icons-material/AlarmOnRounded'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded'
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded'

/* workshops data */
const workshopsData = [
  {
    icon: <AlarmOnRoundedIcon />,
    title: 'Alarm Bot Workshop',
    tagline: 'Build, wire, and program an alarm bot to take home',
    description:
      'Students learn about the necessary engineering skills required to build a wheeled Alarm Bot, with a customisable buzzer sequence and motion path - perfect for waking themselves up just in time for school! The workshop guides the student all the way from the fundamentals of small-scale circuitry to programming the bot in Arduino.',
    duration: '120 minutes',
    yearLevels: 'Years 7 - 10',
    link: '/workshops/alarm-bot'
  },
]

const faqData = [
  {
    question: 'Do students need prior coding or electronics experience?',
    answer: 'No, all required learning content and skills are taught during the workshop. For higher-level skills such as coding in Arduino, we provide templates for the majority of the code and only ask students to code small snippets which they can then test.'
  },
  {
    question: 'What do schools need to provide?',
    answer: 'Specific requirements for each type of workshop can be found within their respective incursion packs. Though we usually ask that workshops be held in computer labs, or if a school has a BYOD policy, then students bring their own laptops.'
  },
  {
    question: 'Why should I choose you as an incursion provider?',
    answer: 'We pride ourselves on being the only STEM incursion provider that allows students an opportunity to take home what they create, ensuring a lasting and tangible connection to the world of robotics, post-workshop.'
  },
]

function Workshops() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      {/* main container */}
      <div className="workshops-container">

        {/* header */}
        <div className="workshops-header">
          <div className="workshops-label">
            <SchoolRoundedIcon />
            <span>Our Workshops</span>
          </div>

          <div className="workshops-title">
            Hands-On Engineering Workshops
          </div>

          <div className="workshops-subtitle">
            Purpose-built robotics incursions that place students in the role of engineers; designing, building, and programming real systems.
          </div>
        </div>

        {/* workshops grid */}
        <div className="workshops-grid">
          {workshopsData.map((workshop, index) => (
            <div key={index} className="workshops-card">
              <div className="workshops-card-icon">{workshop.icon}</div>
              <div className="workshops-card-title">{workshop.title}</div>
              <div className="workshops-card-tagline">{workshop.tagline}</div>
              <div className="workshops-card-description">{workshop.description}</div>

              <div className="workshops-card-meta">
                <span>{workshop.duration}</span>
                <span>{workshop.yearLevels}</span>
              </div>

              <Link to={workshop.link} className="workshops-cta-button">
                Find Out More
              </Link>
            </div>
          ))}

          {/* upcoming workshop */}
          <div className="workshops-card upcoming">
            <div className="workshops-card-icon muted">
              <UpdateRoundedIcon />
            </div>

            <div className="workshops-card-title">
              More Workshops Coming
            </div>

            <div className="workshops-card-description">
              We're actively developing new hands-on engineering workshops that build on
              electronics, robotics, and real-world problem solving.
            </div>

            <span className="workshops-upcoming-tag">
              Launching soon
            </span>
          </div>
        </div>

        {/* divider */}
        <div className="workshops-divider"></div>

        {/* summary */}
        {/* <div className="workshops-summary">
          <div className="workshops-summary-title">
            Why Choose Our Workshops?
          </div>

          <div className="workshops-summary-text">
            Our hands-on engineering workshops are designed to give students real-world skills in electronics, robotics, and problem solving.
          </div>

          <div className="workshops-summary-text">
            Each workshop is carefully structured to be engaging, collaborative, and suitable for beginners. No prior experience required.
          </div>
        </div> */}

        {/* info strip */}
        {/* <div className="workshops-info">
          {workshopsInfoData.map((item, index) => (
            <div key={index} className="workshops-info-item">
              {item.icon}

              <div>
                <p>{item.label}</p>
                <span>{item.value}</span>
              </div>
            </div>
          ))}
        </div> */}
        
        {/* FAQ Section */}
        <div className="workshops-faq">
          <div className="workshops-faq-title">Frequently Asked Questions</div>

          <div className="workshops-faq-list">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`workshops-faq-item ${openIndex === index ? 'open' : ''}`}
              >
                <button
                  className="workshops-faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
                </button>

                <div className="workshops-faq-answer">
                  <div className="workshops-faq-answer-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> 
      </div>
      
      {/* footer */}
      <AlternativeFooter />
    </>
  )
}

export default Workshops