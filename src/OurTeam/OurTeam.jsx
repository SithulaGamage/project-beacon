import './OurTeam.css'

import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';

import AlternativeFooter from '../Footer/AlternativeFooter'

const teamData = [
  {
    name: 'Cody Tran',
    role: 'Founder & Lead Facilitator',
    linkedin: 'https://www.linkedin.com/in/cody-tran-6646682bb/',
    image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    bio: 'Founded Project Beacon to make high-quality, hands-on engineering education accessible to all students. Leads program design, delivery, and curriculum alignment.'
  },
  {
    name: 'Sithula Gamage',
    role: 'Founder & Lead Facilitator',
    linkedin: 'https://www.linkedin.com/in/sithulagamage/',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQGF1T1LAKrRVg/profile-displayphoto-scale_200_200/B56ZnyKQU_IsAY-/0/1760704399886?e=1767830400&v=beta&t=6EAQ2dhjxvbNWpNN3EXcs__ufSRG8KPM5RYrZi_JJ78',
    bio: 'Supports alignment with NSW syllabus outcomes, risk assessments, and best-practice classroom delivery.'
  },
  {
    name: 'Raiyan Raza',
    role: 'Secretary',
    linkedin: 'https://www.linkedin.com/in/raiyanraza/',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQGXpFTYr8H9bQ/profile-displayphoto-shrink_200_200/B56ZVQp3UJHsAc-/0/1740814907026?e=1767830400&v=beta&t=KVBhI85ngZJuVNpVe6vOsrfUyMndhhwh8mKwaOxc5lU',
    bio: 'Experienced facilitators with WWCC clearance and backgrounds in robotics, electronics, and programming.'
  }
]

function Team() {
  return (
    <>
      <div className="team-container">
        {/* header */}
        <div className="team-header">
          <div className="team-label">
            <GroupsRoundedIcon />
            <span>Our Team</span>
          </div>

          <div className="team-title">Meet the People Behind Project Beacon</div>

          <p className="team-subtitle">
            Project Beacon is led by passionate educators and engineers committed to delivering safe, inclusive, and inspiring STEM learning experiences.
          </p>
        </div>

        {/* team grid */}
        <div className="team-grid">
          {teamData.map((member, index) => (
            <div key={index} className="team-card">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="team-avatar"
                aria-label={`View ${member.name} on LinkedIn`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                />
              </a>

              <span className="team-name">{member.name}</span>
              <span className="team-role">{member.role}</span>
              <span className="team-bio">{member.bio}</span>
            </div>
          ))}
        </div>

        {/* values */}
        <div className="team-values">
          <div className="team-values-title">What Drives Us</div>
          <p className="team-values-description">
            We believe every student deserves access to real engineering experiences. Our programs prioritise safety, inclusivity, and hands-on learning that builds confidence and curiosity.
          </p>
        </div>
      </div>
      
      {/* footer */}
      <AlternativeFooter />
    </>
  )
}

export default Team
