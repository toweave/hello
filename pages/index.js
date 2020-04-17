import Layout from '../components/Layout';
import Link from 'next/link';
import axios from 'axios'

const PostLink = (props) => {
  console.log(6, props);
  const { show } = props || {};
  return (
    <li>
      <Link href="/p/[id]" as={`/p/${show.id}`}>
        <a>{show.name}</a>
      </Link>
    </li>
  );
};

const IndexPageContent = (props) => {
  console.log(14, props);
  const { shows = [] } = props || {};
  console.log(20, shows);
  return (
    <>
      <p>Hello Next.js</p>
      <h1>My Blog</h1>
      <ul>
        {
          shows.map(show => {
            console.log(28, "show::", show);
            return (
              <div key={show.id}>
                <PostLink show={show} />
              </div>
            );
          })
        }
      </ul>
    </>
  );
};

const Index = (props) => {
  return (
    <>
      <Layout>
        <IndexPageContent shows={props.shows} />
      </Layout>
    </>
  );
};

Index.getInitialProps = async function () {
  const res = await axios
    .get('https://api.tvmaze.com/search/shows?q=batman')
    .catch((err) => {
      console.log(10, err)
    });
  console.log(3666, res);
  const { data = [] } = res || {};

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};

export default Index

