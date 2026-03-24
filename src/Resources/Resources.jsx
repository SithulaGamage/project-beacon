import './Resources.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AlternativeFooter from '../Footer/AlternativeFooter.jsx'

import LockIcon from '@mui/icons-material/Lock'
import DownloadIcon from '@mui/icons-material/Download'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ComputerIcon from '@mui/icons-material/Computer'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

const resourcesData = [
  {
    icon: <MenuBookIcon />,
    title: 'Student Build Manual',
    description: 'Step-by-step assembly guide with diagrams and safety instructions.',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    link: '/files/AlarmBot-Build-Manual.pdf'
  },
  {
    icon: <ComputerIcon />,
    title: 'Workshop Code Templates',
    description: 'Access pre-written Arduino code for each workshop project.',
    fileType: 'Workshops',
    workshops: [
      {
        name: 'Alarm Bot Workshop',
        link: '/resources/alarm-bot-template-code'
      },
      // {
      //   name: 'Line Following Robot',
      //   link: '/resources/line-follower-code'
      // },
      // {
      //   name: 'Obstacle Avoidance Robot',
      //   link: '/resources/obstacle-bot-code'
      // }
    ]
  }
]

function Resources() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return localStorage.getItem('resourcesUnlocked') === 'false'
  })

  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState(false)

  const handleUnlock = () => {
    if (accessCode === 'beacon2025') {
      setIsUnlocked(true)
      localStorage.setItem('resourcesUnlocked', 'false')
      setError(false)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleUnlock()
  }

  // locked view
  if (!isUnlocked) {
    return (
      <div className='resources-container locked'>
        <div className='resources-header'>
          <div className='resources-title'>Resources</div>
        </div>

        <div className='resources-locked-card'>
          <div className='resources-locked-icon'>
            <LockIcon />
          </div>

          <div className='resources-locked-title'>Protected Resources</div>
          <p className='resources-locked-description'>
            These resources are available to registered schools. Please enter your access code.
          </p>

          <div className='resources-access-code-section'>
            <label className='resources-access-code-label'>Access Code</label>

            <input
              type='text'
              className={`resources-access-code-input ${error ? 'error' : ''}`}
              placeholder='Enter access code'
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <button
              className='resources-unlock-button'
              onClick={handleUnlock}
            >
              Unlock Resources
            </button>
          </div>
        </div>
      </div>
    )
  }

  // unlocked view
  return (
    <>
      <div className='resources-container unlocked'>
        <div className='resources-header'>
          <div className='resources-title'>Resources</div>
          <p className='resources-subtitle'>
            Comprehensive materials for educators. Access student manuals, code templates, and curriculum documentation.
          </p>
        </div>

        <div className='resources-grid'>
          {resourcesData.map((resource, index) => (
            <div key={index} className='resources-card'>
              <div className='resources-card-header'>
                <div className='resources-card-icon'>{resource.icon}</div>
                <span className='resources-card-file-type'>{resource.fileType}</span>
              </div>

              <div className='resources-card-title'>{resource.title}</div>
              <p className='resources-card-description'>{resource.description}</p>

              <div className='resources-card-footer'>
                {resource.fileSize && (
                  <span className='resources-card-file-size'>{resource.fileSize}</span>
                )}

                {resource.fileType === 'Workshops' ? (
                  <div className="resources-workshop-buttons">
                    {resource.workshops.map((workshop, i) => (
                      <Link
                        key={i}
                        to={workshop.link}
                        className="resources-workshop-button"
                      >
                        <RocketLaunchIcon />
                        {workshop.name}
                      </Link>
                    ))}
                  </div>
                ) : resource.fileType === 'PDF' ? (
                  <a
                    href={resource.link}
                    className='resources-card-download-button'
                    download
                  >
                    <DownloadIcon />
                    Download
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* <div className='resources-support-section'>
          <div className='resources-support-title'>Need Additional Support?</div>
          <p className='resources-support-description'>
            Our team is available to help with resource questions, technical support, or curriculum integration guidance.
          </p>
          <button className='resources-support-button'>
            Contact Support Team
          </button>
        </div> */}
      </div>

      <AlternativeFooter />
    </>
  )
}

export default Resources
