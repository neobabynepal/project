import React, { useState } from 'react';
import { submitContactSubmission } from '@/lib/strapi';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    inquirySubject: 'General Business Inquiry',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    const result = await submitContactSubmission(formData);

    if (result && result.success) {
      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        inquirySubject: 'General Business Inquiry',
        message: ''
      });
    } else {
      setStatus({
        submitting: false,
        submitted: false,
        error: result?.error || 'Failed to submit inquiry. Please try again.'
      });
    }
  };

  return (
    <div style={{ background: 'var(--color-bg-white)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '1.5rem' }}>
        Send Us a Message
      </h3>

      {status.submitted && (
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          color: '#15803d',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          fontSize: '0.95rem'
        }}>
          <strong>Thank you for contacting Adhikari Group!</strong>
          <p style={{ marginTop: '0.25rem', fontSize: '0.9rem' }}>Your inquiry has been received. Our corporate representative will get back to you shortly.</p>
        </div>
      )}

      {status.error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#b91c1c',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          fontSize: '0.95rem'
        }}>
          {status.error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              className="form-control"
              placeholder="e.g. Ramesh Shrestha"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Official Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="form-control"
              placeholder="name@organization.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">Contact Telephone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              placeholder="+977 98XXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="organization">Organization / Company</label>
            <input
              type="text"
              id="organization"
              name="organization"
              className="form-control"
              placeholder="Your company or business name"
              value={formData.organization}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="inquirySubject">Inquiry Subject</label>
          <select
            id="inquirySubject"
            name="inquirySubject"
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

        <div className="form-group">
          <label className="form-label" htmlFor="message">Your Message *</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            className="form-control"
            placeholder="Please share the details of your inquiry or proposal..."
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={status.submitting}
          style={{ width: '100%' }}
        >
          {status.submitting ? 'Submitting Message...' : 'Submit Official Inquiry'}
          {!status.submitting && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
