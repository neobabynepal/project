import React from 'react';
import Head from 'next/head';
import { getSiteSettings } from '@/lib/strapi';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage({ settings }) {
  const address = settings?.address;
  const phone = settings?.phone;
  const email = settings?.email;
  const officeHours = settings?.officeHours;

  return (
    <>
      <Head>
        <title>Contact Us | Adhikari Group</title>
        <meta name="description" content="Get in touch with Adhikari Group corporate headquarters in Kathmandu for general inquiries, dealership opportunities, brand representation, and partnerships." />
        <meta property="og:title" content="Contact Us | Adhikari Group" />
        <meta property="og:description" content="Get in touch with Adhikari Group corporate headquarters in Kathmandu for general inquiries, dealership opportunities, brand representation, and partnerships." />
      </Head>

      <section className="page-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'Contact' }]} />
          <h1 className="page-hero-title">Contact Corporate Headquarters</h1>
          <p className="page-hero-desc">
            Connect with our executive team for business partnerships, retail distribution, dealership requests, and official inquiries.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-page-grid">
            {/* Left: Contact Info cards */}
            <div>
              <div className="section-badge">Headquarters</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '1.5rem' }}>
                We Welcome Dialogue & Partnerships
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                Our corporate offices are centrally located{address ? ` in ${address}` : ''}. Whether you wish to distribute our brands in your province or explore supply alliances, our team is ready to assist.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {address && (
                  <div style={{ background: 'var(--color-bg-white)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ color: 'var(--color-orange)', marginBottom: '0.75rem' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '0.35rem' }}>
                      Office Address
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{address}</p>
                  </div>
                )}

                {phone && (
                  <div style={{ background: 'var(--color-bg-white)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ color: 'var(--color-orange)', marginBottom: '0.75rem' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '0.35rem' }}>
                      Telephone
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{phone}</p>
                  </div>
                )}

                {email && (
                  <div style={{ background: 'var(--color-bg-white)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ color: 'var(--color-orange)', marginBottom: '0.75rem' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '0.35rem' }}>
                      Official Email
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{email}</p>
                  </div>
                )}

                {officeHours && (
                  <div style={{ background: 'var(--color-bg-white)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ color: 'var(--color-orange)', marginBottom: '0.75rem' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '0.35rem' }}>
                      Office Hours
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{officeHours}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Interactive Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const settings = await getSiteSettings();

  return {
    props: {
      settings
    },
    revalidate: 60
  };
}
