import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Content = () => {
  const router = useRouter();
  console.log(666666666666666, router);
  return (
    <>
      <h1>{router.query.title}</h1>
      <p>This is the blog post content.</p>
    </>
  );
};

const Page = () => (
  <Layout>
    <Content />
  </Layout>
);

export default Page;
