import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, settings }) {
  return (
    <>
      <Header settings={settings} />
      <main id="main-content">
        {children}
      </main>
      <Footer settings={settings} />
    </>
  );
}
