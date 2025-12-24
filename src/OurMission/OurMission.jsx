import './OurMission.css'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded'
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'

import AlternativeFooter from '../Footer/AlternativeFooter.jsx'

/* mission pillars data */
const missionPillars = [
  {
    icon: <EngineeringRoundedIcon />,
    title: 'Authentic Engineering',
    description:
      'We believe students learn best by building real systems. Our programs focus on genuine engineering practices, not simulations.'
  },
  {
    icon: <SchoolRoundedIcon />,
    title: 'Accessible Education',
    description:
      'No prior experience required. Every student is supported, regardless of background or confidence with technology.'
  },
  {
    icon: <GroupsRoundedIcon />,
    title: 'Equity & Inclusion',
    description:
      'Every participant takes home their own project, ensuring equal access to hands-on STEM learning.'
  }
]

function Mission() {
  return (
    <>
      {/* main container */}
      <div className="mission-container">

        {/* header section */}
        <div className="mission-header">
          <div className="mission-label">
            <AutoAwesomeOutlinedIcon />
            <span>Our Mission</span>
          </div>

          <div className="mission-title">Building Confidence Through Engineering</div>

          <div className="mission-subtitle">
            Project Beacon exists to make high-quality, hands-on engineering education accessible to every student - empowering young people with skills that extend far beyond the classroom.
          </div>
        </div>

        {/* core statement */}
        {/* NEED SOMETHING BETTER HERE */}
        <div className="mission-statement">
          <p>
            We design and deliver immersive robotics workshops that place students in
            the role of engineers. By working with real electronics, code, and mechanical
            systems, students develop problem-solving skills, technical confidence, and
            a deeper understanding of how technology shapes the world around them.
          </p>
        </div>

        {/* mission pillars */}
        <div className="mission-pillars">
          {missionPillars.map((pillar, index) => (
            <div key={index} className="mission-card">
              <div className="mission-card-icon">{pillar.icon}</div>
              <div className="mission-card-title">{pillar.title}</div>
              <div className="mission-card-description">{pillar.description}</div>
            </div>
          ))}
        </div>

        {/* closing section */}
        <div className="mission-closing">
          <div className="mission-closing-title">Inspiring the Next Generation</div>
          <div className="mission-closing-text">
            Our goal is simple: give students the opportunity to discover what they are
            capable of when they are trusted with real tools, real challenges, and real
            responsibility.
          </div>
        </div>

      </div>

      {/* footer */}
      <AlternativeFooter />
    </>
  )
}

export default Mission
