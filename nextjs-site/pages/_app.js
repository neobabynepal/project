import '@/styles/globals.css';
import Layout from '@/components/layout/Layout';

export default function App({ Component, pageProps }) {
  // If a page specifies custom layout or none
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <Layout settings={pageProps.settings}>
      <Component {...pageProps} />
    </Layout>
  );
}
