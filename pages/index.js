import Layout from '../components/Layout';
import Link from 'next/link';

const PostLink = props => (
  <li>
    <Link href="/p/[id]" as={`/p/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);

const IndexPageContent = props => (
  <>
    <p>Hello Next.js</p>
    <h1>My Blog</h1>
    <ul>
      <PostLink id="hello-nextjs" />
      <PostLink id="Learn Next.js is awesome" />
      <PostLink id="Deploy apps with Zeit" />
    </ul>
  </>
);

export default function Index() {
  return (
    <>
      <Layout>
        <IndexPageContent />
      </Layout>
    </>
  );
}
