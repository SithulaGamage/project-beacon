import './Workshops.css'
import AlternativeFooter from '../Footer/AlternativeFooter'

import { Link } from 'react-router-dom'

import AlarmOnRoundedIcon from '@mui/icons-material/AlarmOnRounded'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded'

/* workshops data */
const workshopsData = [
  {
    icon: <AlarmOnRoundedIcon />,
    title: 'Alarm Bot Workshop',
    tagline: 'Build, wire, and program a functional alarm system',
    description:
      'Students design and build a working alarm bot using real electronics and Arduino code. Through guided instruction, students learn how sensors, outputs, and logic combine to form an engineered system.',
    highlights: [
      'Arduino programming fundamentals',
      'Breadboard wiring & electronics safety',
      'Sensors, buzzers, and LEDs',
      'Debugging and iteration'
    ],
    duration: '120 minutes',
    yearLevels: 'Years 7 - 10',
    link: '/workshops/alarm-bot'
  },
  // {
  //   icon: <BoltRoundedIcon />,
  //   title: 'Lightning Circuit Challenge',
  //   tagline: 'Design fast and efficient circuits under time pressure',
  //   description:
  //     'Students tackle a series of hands-on circuit challenges, learning to optimize speed and reliability. This workshop encourages creative problem solving with electronics and teamwork.',
  //   highlights: [
  //     'Circuit design under time constraints',
  //     'LEDs, resistors & switches',
  //     'Collaborative problem solving',
  //     'Hands-on prototyping'
  //   ],
  //   duration: '75 minutes',
  //   yearLevels: 'Years 8–10',
  //   link: '/lightning-circuit-challenge'
  // }
]

/* info strip data */
const workshopsInfoData = [
  {
    icon: <AccessTimeRoundedIcon />,
    label: 'Duration',
    value: '120-minute sessions'
  },
  {
    icon: <GroupsRoundedIcon />,
    label: 'Year Levels',
    value: 'Years 7 - 10'
  },
  {
    icon: <BoltRoundedIcon />,
    label: 'Requirements',
    value: 'No prior experience required'
  }
]

function Workshops() {
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

              <ul className="workshops-card-list">
                {workshop.highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

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
              We’re actively developing new hands-on engineering workshops that build on
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
        <div className="workshops-summary">
          <div className="workshops-summary-title">
            Why Choose Our Workshops?
          </div>

          <div className="workshops-summary-text">
            Our hands-on engineering workshops are designed to give students real-world skills in electronics, robotics, and problem solving.
          </div>

          <div className="workshops-summary-text">
            Each workshop is carefully structured to be engaging, collaborative, and suitable for beginners. No prior experience required.
          </div>
        </div>

        {/* info strip */}
        <div className="workshops-info">
          {workshopsInfoData.map((item, index) => (
            <div key={index} className="workshops-info-item">
              {item.icon}

              <div>
                <p>{item.label}</p>
                <span>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* footer */}
      <AlternativeFooter />
    </>
  )
}

export default Workshops
