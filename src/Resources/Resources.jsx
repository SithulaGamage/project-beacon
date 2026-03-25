import './Resources.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlternativeFooter from '../Footer/AlternativeFooter.jsx'

import LockIcon from '@mui/icons-material/Lock'
import DownloadIcon from '@mui/icons-material/Download'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ComputerIcon from '@mui/icons-material/Computer'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

const resourcesData = [
  {
    title: 'Student Resources',
    subblocks: [
      {
        icon: <MenuBookIcon />,
        title: 'Alarm Bot Manual',
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
          }
        ]
      }
    ]
  }
]

function Resources() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const unlocked = sessionStorage.getItem('resourcesUnlocked') === 'true'
    if (unlocked) setIsUnlocked(true)
  }, [])

  const handleUnlock = () => {
    if (accessCode === 'beacon2025') {
      setIsUnlocked(true)
      sessionStorage.setItem('resourcesUnlocked', 'true')
      setError(false)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleUnlock()
  }

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
              <div className='resources-card-title'>{resource.title}</div>

              {resource.subblocks.map((subblock, i) => (
                <div key={i} className='resources-subblock'>
                  <div className='resources-card-header'>
                    <div className='resources-card-icon'>{subblock.icon}</div>
                    <span className='resources-card-file-type'>{subblock.fileType}</span>
                  </div>

                  <div className='resources-card-subtitle'>{subblock.title}</div>
                  <p className='resources-card-description'>{subblock.description}</p>

                  <div className='resources-card-footer'>
                    {subblock.fileSize && (
                      <span className='resources-card-file-size'>{subblock.fileSize}</span>
                    )}

                    {subblock.fileType === 'Workshops' ? (
                      <div className="resources-workshop-buttons">
                        {subblock.workshops.map((workshop, j) => (
                          <Link
                            key={j}
                            to={workshop.link}
                            className="resources-workshop-button"
                          >
                            <RocketLaunchIcon />
                            {workshop.name}
                          </Link>
                        ))}
                      </div>
                    ) : subblock.fileType === 'PDF' ? (
                      <a
                        href={subblock.link}
                        className='resources-card-download-button'
                        download
                      >
                        <DownloadIcon />
                        Download
                      </a>
                    ) : null}
                  </div>

                  {i < resource.subblocks.length - 1 && <hr className="resources-subblock-separator" />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <AlternativeFooter />
    </>
  )
}

export default Resources