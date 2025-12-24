import './PrivacyPolicy.css'
import AlternativeFooter from '../Footer/AlternativeFooter'

function PrivacyPolicy() {
  return (
    <>
      {/* main container */}
      <div className="privacy-container">
      <div className="privacy-header">
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-updated">
          Last updated: January 2025
          </p>
      </div>

      <div className="privacy-card">
          <section className="privacy-section">
          <h2>1. Introduction</h2>
          <p>
              We respect your privacy and are committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, and safeguard your data when you
              use our website and services.
          </p>
          </section>

          <section className="privacy-section">
          <h2>2. Information We Collect</h2>
          <p>
              We may collect limited personal information, including but not limited to:
          </p>
          <ul>
              <li>Contact details such as name and email address</li>
              <li>School or organisation information (if provided)</li>
              <li>Usage data such as pages visited and interactions</li>
          </ul>
          </section>

          <section className="privacy-section">
          <h2>3. How We Use Your Information</h2>
          <p>
              Your information is used only to:
          </p>
          <ul>
              <li>Provide access to protected resources</li>
              <li>Improve our educational services</li>
              <li>Respond to enquiries and support requests</li>
          </ul>
          </section>

          <section className="privacy-section">
          <h2>4. Data Storage & Security</h2>
          <p>
              We take reasonable technical and organisational measures to protect your data.
              Access codes and limited session data may be stored locally in your browser
              to improve user experience.
          </p>
          </section>

          <section className="privacy-section">
          <h2>5. Third-Party Services</h2>
          <p>
              We do not sell or rent your personal information. Limited third-party tools
              (such as analytics or hosting providers) may process data only as required
              to operate the service.
          </p>
          </section>

          <section className="privacy-section">
          <h2>6. Your Rights</h2>
          <p>
              You have the right to request access to, correction of, or deletion of your
              personal information, subject to applicable laws.
          </p>
          </section>

          <section className="privacy-section">
          <h2>7. Changes to This Policy</h2>
          <p>
              We may update this Privacy Policy from time to time. Any changes will be
              posted on this page with an updated revision date.
          </p>
          </section>

          <section className="privacy-section">
          <h2>8. Contact Us</h2>
          <p>
              If you have questions about this Privacy Policy or how your information
              is handled, please contact us through our official support channels.
          </p>
          </section>
      </div>
      </div>

      <AlternativeFooter />
    </>
  )
}

export default PrivacyPolicy
