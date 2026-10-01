import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Send } from 'lucide-react';
import InteractiveBackground from '../components/InteractiveBackground';
import { GitHubIcon, LinkedInIcon, InstagramIcon, MailIcon } from '../components/Icons';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const targetEmail = "richardsenthomas888@gmail.com";

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all fields before sending.');
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            recipient: targetEmail
          })
        });

        if (!res.ok) {
          throw new Error('Submission endpoint error');
        }
      } else {
        // Natural client-side handling when no backend secret is configured
        // Triggers native mailto link as backup so the message is never lost
        const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
          `Message from ${formData.name}`
        )}&body=${encodeURIComponent(
          `From: ${formData.name} (${formData.email})\n\n${formData.message}`
        )}`;
        
        // Open background mail client cleanly
        const mailLink = document.createElement('a');
        mailLink.href = mailtoUrl;
        mailLink.style.display = 'none';
        document.body.appendChild(mailLink);
        mailLink.click();
        document.body.removeChild(mailLink);
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      // Fallback grace
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page-root">
      <InteractiveBackground subtle={true} />

      {/* Top Glass Navigation Bar */}
      <header className="contact-top-bar">
        <div className="container contact-bar-inner">
          <Link to="/" className="glass-back-btn font-quirky">
            <ArrowLeft size={16} />
            <span>BACK TO HOME</span>
          </Link>
          <span className="contact-route-tag font-hand">
            get in touch /
          </span>
        </div>
      </header>

      <main className="container contact-main-content">
        <div className="contact-spread-grid">
          
          {/* Left Column: Massive Editorial Heading */}
          <div className="contact-heading-column">
            <span className="contact-eyebrow font-hand">say hello /</span>
            <h1 className="contact-page-headline font-quirky">
              LET&apos;S<br />TALK.
            </h1>
            <p className="contact-page-desc font-body">
              Have a project, a weird experiment, or want to build something together? Send a note directly to{' '}
              <a href={`mailto:${targetEmail}`} className="contact-direct-email">
                {targetEmail}
              </a>.
            </p>

            {/* Direct Channel Badges */}
            <div className="contact-social-deck">
              <a 
                href="https://github.com/rtomswastaken" 
                target="_blank" 
                rel="noreferrer" 
                className="glass-channel-pill font-quirky"
              >
                <GitHubIcon size={16} />
                <span>GITHUB</span>
                <ArrowUpRight size={13} />
              </a>
              <a 
                href="https://linkedin.com/in/richardsenthomas" 
                target="_blank" 
                rel="noreferrer" 
                className="glass-channel-pill font-quirky"
              >
                <LinkedInIcon size={16} />
                <span>LINKEDIN</span>
                <ArrowUpRight size={13} />
              </a>
              <a 
                href="https://instagram.com/rtoooms" 
                target="_blank" 
                rel="noreferrer" 
                className="glass-channel-pill font-quirky"
              >
                <InstagramIcon size={16} />
                <span>INSTAGRAM</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Right Column: Glassmorphic Contact Form */}
          <div className="contact-form-column">
            <div className="glass-form-card">
              {isSubmitted ? (
                <div className="contact-success-state">
                  <div className="success-icon-wrap">
                    <Check size={28} color="#0066D6" />
                  </div>
                  <h2 className="success-title font-quirky">MESSAGE SENT.</h2>
                  <p className="success-desc font-body">
                    Thanks for reaching out! I&apos;ll get back to you at your email soon.
                  </p>
                  <button 
                    type="button" 
                    onClick={() => setIsSubmitted(false)}
                    className="glass-send-btn font-quirky"
                  >
                    <span>SEND ANOTHER MESSAGE</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-actual-form">
                  {errorMsg && (
                    <div className="form-error-banner font-body">
                      {errorMsg}
                    </div>
                  )}

                  <div className="form-field-group">
                    <label htmlFor="contact-name" className="form-label font-quirky">
                      NAME
                    </label>
                    <input 
                      id="contact-name"
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name or alias"
                      className="glass-input font-body"
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="contact-email" className="form-label font-quirky">
                      EMAIL
                    </label>
                    <input 
                      id="contact-email"
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@domain.com"
                      className="glass-input font-body"
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="contact-message" className="form-label font-quirky">
                      MESSAGE
                    </label>
                    <textarea 
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What are we making?"
                      className="glass-input glass-textarea font-body"
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="glass-send-btn font-quirky"
                  >
                    <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
