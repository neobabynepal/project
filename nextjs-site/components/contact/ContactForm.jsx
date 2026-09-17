import React, { useState } from 'react';
import { submitContactSubmission } from '@/lib/strapi';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    inquirySubject: 'General Business Inquiry',
    message: '',
    website_hp: '' // Anti-spam honeypot field (hidden from normal users)
  });

  const [errors, setErrors] = useState({});

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field-level error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const name = formData.fullName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const message = formData.message.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

    if (!name || name.length < 2) {
      newErrors.fullName = 'Full name is required (minimum 2 characters).';
    }
    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@organization.com).';
    }
    if (phone && (phone.length < 7 || !phoneRegex.test(phone))) {
      newErrors.phone = 'Please enter a valid telephone number.';
    }
    if (!message || message.length < 10) {
      newErrors.message = 'Please provide a detailed inquiry message (minimum 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status.submitting) return; // Prevent double submission trigger

    // Check client validation
    const isValid = validateForm();
    if (!isValid) {
      setStatus({ submitting: false, submitted: false, error: 'Please correct the highlighted fields before submitting.' });
      return;
    }

    setStatus({ submitting: true, submitted: false, error: null });

    const result = await submitContactSubmission(formData);

    if (result && result.success) {
      setStatus({ submitting: false, submitted: true, error: null });
      setErrors({});
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        inquirySubject: 'General Business Inquiry',
        message: '',
        website_hp: ''
      });
    } else {
      setStatus({
        submitting: false,
        submitted: false,
        error: result?.error || 'We were unable to process your inquiry at this time. Please try again or reach out directly to info@adhikarigroup.com.'
      });
    }
  };

  return (
    <div className="contact-card-box">
      <div className="contact-badge">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Executive Inquiry Portal
      </div>

      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '0.4rem' }}>
        Send Us an Official Message
      </h3>
      <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.55, marginBottom: '1.75rem' }}>
        Complete the form below to connect directly with our corporate team regarding partnerships, dealership applications, or press inquiries.
      </p>

      {status.submitted && (
        <div
          role="alert"
          aria-live="polite"
          style={{
            background: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#15803d',
            padding: '1.25rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.75rem',
            fontSize: '0.95rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Thank You for Contacting Adhikari Group
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#166534', lineHeight: 1.5 }}>
            Your inquiry has been logged successfully. An executive representative will follow up with you within 24 business hours.
          </p>
        </div>
      )}

      {status.error && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#b91c1c',
            padding: '1.25rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.75rem',
            fontSize: '0.92rem',
            lineHeight: 1.5
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Submission Notice
          </div>
          {status.error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Anti-Spam Honeypot Field (Invisible to human users) */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <label htmlFor="website_hp">Leave this field blank</label>
          <input
            type="text"
            id="website_hp"
            name="website_hp"
            value={formData.website_hp}
            onChange={handleChange}
            tabIndex="-1"
            autoComplete="off"
          />
        </div>

        {/* Row 1: Full Name & Official Email */}
        <div className="form-row-2col">
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">
              <span>Full Name <span className="form-label-required">*</span></span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              aria-required="true"
              autoComplete="name"
              disabled={status.submitting}
              className={`form-control ${errors.fullName ? 'form-control-error' : ''}`}
              placeholder="e.g. Ramesh Shrestha"
              value={formData.fullName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
            />
            {errors.fullName && (
              <div id="fullName-error" className="form-error-text" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.fullName}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              <span>Official Email <span className="form-label-required">*</span></span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              aria-required="true"
              autoComplete="email"
              disabled={status.submitting}
              className={`form-control ${errors.email ? 'form-control-error' : ''}`}
              placeholder="name@organization.com"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <div id="email-error" className="form-error-text" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.email}
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Telephone & Organization */}
        <div className="form-row-2col">
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              <span>Contact Telephone</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              disabled={status.submitting}
              className={`form-control ${errors.phone ? 'form-control-error' : ''}`}
              placeholder="+977 98XXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <div id="phone-error" className="form-error-text" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.phone}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="organization">
              <span>Organization / Company</span>
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              autoComplete="organization"
              disabled={status.submitting}
              className="form-control"
              placeholder="Your company or business name"
              value={formData.organization}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Subject Dropdown */}
        <div className="form-group">
          <label className="form-label" htmlFor="inquirySubject">
            <span>Inquiry Subject</span>
          </label>
          <select
            id="inquirySubject"
            name="inquirySubject"
            disabled={status.submitting}
            className="form-control"
            value={formData.inquirySubject}
            onChange={handleChange}
          >
            <option value="General Business Inquiry">General Business Inquiry</option>
            <option value="Distributorship & Dealership">Distributorship & Dealership Inquiry</option>
            <option value="Supplier & Vendor Partnership">Supplier & Vendor Partnership</option>
            <option value="Retail Branch Inquiry">Retail Branch & Products Inquiry</option>
            <option value="Media & Press Inquiry">Media & Corporate Press</option>
            <option value="Career & Recruitment">Career & Recruitment</option>
          </select>
        </div>

        {/* Message Textarea */}
        <div className="form-group">
          <label className="form-label" htmlFor="message">
            <span>Your Message <span className="form-label-required">*</span></span>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', fontWeight: 400 }}>min. 10 chars</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            aria-required="true"
            disabled={status.submitting}
            className={`form-control ${errors.message ? 'form-control-error' : ''}`}
            placeholder="Please share the specific details of your inquiry, commercial proposal, or request..."
            value={formData.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <div id="message-error" className="form-error-text" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {errors.message}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status.submitting}
          style={{ width: '100%', padding: '0.9rem 1.5rem', fontSize: '1rem' }}
        >
          {status.submitting ? (
            <>
              <svg className="spin-loader" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
              </svg>
              Submitting Official Inquiry...
            </>
          ) : (
            <>
              Submit Official Inquiry
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </>
          )}
        </button>
      </form>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
