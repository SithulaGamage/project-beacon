import './Resources.css'
import { useState } from 'react'
import AlternativeFooter from '../Footer/AlternativeFooter.jsx'

import LockIcon from '@mui/icons-material/Lock'
import DownloadIcon from '@mui/icons-material/Download'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import BoltIcon from '@mui/icons-material/Bolt'
import ComputerIcon from '@mui/icons-material/Computer'
import BuildIcon from '@mui/icons-material/Build'
import DescriptionIcon from '@mui/icons-material/Description'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

import StarBorder from '../components/StarBorder.jsx'

const resourcesData = [
  {
    icon: <MenuBookIcon />,
    title: 'Student Build Manual',
    description: 'Step-by-step assembly guide with diagrams and safety instructions.',
    fileSize: '2.4 MB',
    fileType: 'PDF'
  },
  {
    icon: <BoltIcon />,
    title: 'Wiring Diagrams',
    description: 'Detailed breadboard layouts and component connection guides.',
    fileSize: '1.8 MB',
    fileType: 'PDF'
  },
  {
    icon: <ComputerIcon />,
    title: 'Arduino Code Templates',
    description: 'Pre-written code with comments and customization examples.',
    fileSize: '0.5 MB',
    fileType: 'ZIP'
  },
  {
    icon: <BuildIcon />,
    title: 'Troubleshooting Guide',
    description: 'Common issues and solutions for debugging hardware and software.',
    fileSize: '1.2 MB',
    fileType: 'PDF'
  },
  {
    icon: <DescriptionIcon />,
    title: 'Curriculum Mapping Document',
    description: 'NSW syllabus alignment and learning outcome documentation.',
    fileSize: '0.8 MB',
    fileType: 'PDF'
  },
  {
    icon: <RocketLaunchIcon />,
    title: 'Extension Activities',
    description: 'Advanced challenges and modifications for high-achieving students.',
    fileSize: '1.5 MB',
    fileType: 'PDF'
  }
]

function Resources() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    // remember to uncomment this
    // return localStorage.getItem('resourcesUnlocked') === 'true'
    // return localStorage.getItem('resourcesUnlocked') === 'false'
  })

  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState(false)

  const handleUnlock = () => {
    if (accessCode === 'beacon2025') {
      setIsUnlocked(true)
      localStorage.setItem('resourcesUnlocked', 'true')
      setError(false)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUnlock()
    }
  }

  if (!isUnlocked) {
    return (
      <div className='resources-container'>
        {/* header */}
        <div className='resources-header'>
          <div className='resources-title'>Resources</div>
        </div>

        {/* locked card */}
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
              onKeyPress={handleKeyPress}
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
      {/* main container */}
      <div className='resources-container'>
        {/* header */}
        <div className='resources-header'>
          <div className='resources-title'>Resources</div>
          <p className='resources-subtitle'>
            Comprehensive materials for educators. Access student manuals, code templates, and curriculum documentation.
          </p>
        </div>

        {/* grid */}
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
                <span className='resources-card-file-size'>{resource.fileSize}</span>

                <button className='resources-card-download-button'>
                  <DownloadIcon />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* additional support */}
        <div className='resources-support-section'>
          <div className='resources-support-title'>Need Additional Support?</div>
          <p className='resources-support-description'>
            Our team is available to help with resource questions, technical support, or curriculum integration guidance.
          </p>
          <button className='resources-support-button'>
            Contact Support Team
          </button>
        </div>
      </div>

      {/* footer */}
      <AlternativeFooter />
    </>
  )
}

export default Resources
