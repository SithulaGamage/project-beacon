import './AlarmBotWorkshop.css'

import BoltIcon from '@mui/icons-material/Bolt'
import ComputerIcon from '@mui/icons-material/Computer'
import BuildIcon from '@mui/icons-material/Build'
import SchoolIcon from '@mui/icons-material/School'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import GroupsIcon from '@mui/icons-material/Groups'
import AlternativeFooter from '../Footer/AlternativeFooter'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'

function AlarmBot() {
  return (
    <>
      {/* Back button */}
      <div className="alarmbot-back-button-container">
        <Link to="/workshops" className="alarmbot-back-button">
          <ArrowBackIcon fontSize="small" />
          Back to Workshops
        </Link>
      </div>

      {/* main container */}
      <div className="alarmbot-container">

        {/* Header */}
        <div className="alarmbot-header">
          <span className="alarmbot-label">Workshop</span>
          <h1 className="alarmbot-title">Alarm Bot</h1>
          <p className="alarmbot-subtitle">
            A hands-on robotics workshop where students design, build,
            and program a motion-activated alarm system.
          </p>
        </div>

        {/* Overview */}
        <div className="alarmbot-overview">
          <p>
            In the Alarm Bot workshop, students step into the role of engineers.
            They work with real electronic components, sensors, and microcontrollers
            to construct a functioning alarm system that detects movement and responds
            with sound and light.
          </p>
        </div>

        {/* Info Grid */}
        <div className="alarmbot-info-grid">
          <div className="alarmbot-info-card">
            <AccessTimeIcon />
            <div>
              <span>Duration</span>
              <p>90–120 minutes</p>
            </div>
          </div>

          <div className="alarmbot-info-card">
            <GroupsIcon />
            <div>
              <span>Year Levels</span>
              <p>Years 5–10</p>
            </div>
          </div>

          <div className="alarmbot-info-card">
            <SchoolIcon />
            <div>
              <span>Delivery</span>
              <p>On-site at your school</p>
            </div>
          </div>
        </div>

        {/* What Students Learn */}
        <div className="alarmbot-section">
          <h2>What Students Learn</h2>

          <div className="alarmbot-learn-grid">
            <div className="alarmbot-learn-card">
              <BoltIcon />
              <h3>Electronics</h3>
              <p>
                Learn how sensors, buzzers, LEDs, and resistors work together
                in a real circuit.
              </p>
            </div>

            <div className="alarmbot-learn-card">
              <ComputerIcon />
              <h3>Programming</h3>
              <p>
                Write and modify Arduino code to control inputs, outputs,
                and conditional logic.
              </p>
            </div>

            <div className="alarmbot-learn-card">
              <BuildIcon />
              <h3>Engineering Design</h3>
              <p>
                Test, debug, and improve their system through iterative problem-solving.
              </p>
            </div>
          </div>
        </div>

        {/* Outcomes */}
        <div className="alarmbot-section alarmbot-outcomes">
          <h2>Learning Outcomes</h2>
          <ul>
            <li>Understand how motion sensors detect changes in the environment</li>
            <li>Develop confidence working with electronics and code</li>
            <li>Apply logical thinking to solve real engineering problems</li>
            <li>Collaborate and troubleshoot as a team</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="alarmbot-cta">
          <h2>Interested in Running This Workshop?</h2>
          <p>
            Get in touch to discuss availability, pricing, and how the Alarm Bot
            workshop can fit into your school’s program.
          </p>
          <Link to="/get-started" className="alarmbot-cta-button">
            Contact Us
          </Link>
        </div>

      </div>

      {/* footer */}
      <AlternativeFooter />
    </>
  )
}

export default AlarmBot
