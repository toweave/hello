import Layout from '../components/Layout';

const AboutPageContent = (props) => <p>This is the about page</p>;

export default function About() {
  return (
    <>
      <Layout>
        <AboutPageContent />
      </Layout>
    </>
  );
}
