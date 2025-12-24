import './Homepage.css'

import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer.jsx'
import DarkVeil from '../components/DarkVeil.jsx'

import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

import StarBorder from '../components/StarBorder.jsx';
import ShinyText from '../components/ShinyText.jsx';
import SpotlightCard from '../components/SpotlightCard.jsx'

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
      "Designed for students of all backgrounds and experience levels. No prior coding or electronics knowledge required.",
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
      "Developing practical engineering capability through design thinking, problem solving, and real-world systems.",
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
      "Every student takes home their own robot, ensuring equal access to meaningful STEM learning.",
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
				WWC Compliance
			</>
		),
    description:
      "All facilitators hold valid Working With Children Checks and relevant certifications.",
  },
  {
    title: (
			<>
				<span>
					<HomeRepairServiceRoundedIcon />
				</span>
				All Materials Supplied
			</>
		),
    description:
      "Every component, tool, and resource provided. From Arduino boards to 3D-printed parts.",
  },
  {
    title: (
			<>
				<span>
					<ElectricBoltRoundedIcon />
				</span>
				No Teacher Prep Required
			</>
		),
    description:
      "Completely turnkey experience. Teachers can observe or participate. No prior setup needed.",
  },
  {
    title: (
			<>
				<span>
					<LockRoundedIcon />
				</span>
				Safe, Tested Components
			</>
		),
    description:
      "Age-appropriate materials tested for safety. Low-voltage electronics and quality-assured parts.",
  },
];

const spotlightColorHEX = '#b6ff6d6e'

function Homepage() {
  return (
    <>
      {/* dark veil background */}
      <div className='dark-veil-background'>
        <DarkVeil />
      </div>

      <div className="homepage-container">
        {/* hero section */}
        <div className="homepage-hero-container">
          {/* text */}
          <div className="homepage-hero-text-container">
            <div className="homepage-hero-title">Youth Robotics Incursion</div>
            {/* NEED TO REWORD THIS */}
            <div className="homepage-hero-subtitle">
              Turning classrooms into real engineering environments for students
            </div>
          </div>

          {/* call to action */}
          <div className="homepage-hero-call-to-action-container">
            <div className="homepage-hero-call-to-action-incursion-pack-button">
              <DownloadRoundedIcon />
              <span>Download Incursion Pack</span>
            </div>

            <StarBorder
              as="button"
              className="homepage-hero-call-to-action-enquire-now-button"
              color="white"
              speed="5s"
            >
              <EmailRoundedIcon />
              <Link to="/get-started" className='contact-link'>
                <span>Enquire Now</span>
              </Link>
            </StarBorder>
          </div>
        </div>

        {/* 'what is project beacon' section*/}
        <div className='homepage-section main'>
          {/* label */}
          <div className='homepage-section-label'>
            <AutoAwesomeOutlinedIcon />
            <ShinyText
              text="Background"
              disabled={false} 
              speed={3}
            />
          </div>

          {/* text */}
          <div className='homepage-section-title'>What is Project Beacon?</div>
          <div className='homepage-section-subtitle'>
            A youth robotics education initiative dedicated to bringing high-quality, hands-on STEM learning to Australian high schools.
          </div>

          {/* feature cards */}
          <div className='homepage-section-cards'>
            {projectBeaconCardsData.map((card, index) => (
              <SpotlightCard
                key={index}
                className="homepage-section-card"
                spotlightColor={spotlightColorHEX}
              >
                <div className='homepage-section-card-title'>{card.title}</div>
                <div className='homepage-section-card-description'>{card.description}</div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* 'what's in it for you' section*/}
        <div className='homepage-section secondary'>
          {/* label */}
          <div className='homepage-section-label'>
            <AutoAwesomeOutlinedIcon />
            <ShinyText
              text="What's in it for you" 
              disabled={false} 
              speed={3}
            />
          </div>

          {/* text */}
          <div className='homepage-section-title'>Risk-Free for Schools</div>
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
