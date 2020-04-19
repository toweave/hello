import Layout from '../components/Layout';
import Link from 'next/link';
import axios from 'axios'

const PostLink = (props) => {
  const { show } = props || {};
  return (
    <li>
      <Link href="/p/[id]" as={`/p/${show.id}?a=234`}>
        <a>{show.name}</a>
      </Link>
      <style jsx>{`
        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: red;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </li>
  );
};

const IndexPageContent = (props) => {
  const { shows = [] } = props || {};
  return (
    <>
      <p>Hello Next.js</p>
      <h1>My Blog</h1>
      <ul>
        {
          shows.map(show => {
            return (
              <div key={show.id}>
                <PostLink show={show} />
              </div>
            );
          })
        }
      </ul>
      <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
          color: blue;
        }
      `}</style>
    </>
  );
};

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  const res = await axios
    .get(`https://api.tvmaze.com/search/shows?q=batman`)
    .catch((err) => {
      console.log(10, err)
    });
  const { data = [] } = res || {};

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      shows: data.map(entry => entry.show)
    },
  }
}

const Index = (props) => {
  return (
    <>
      <Layout>
        <IndexPageContent shows={props.shows} />
      </Layout>
    </>
  );
};

export default Index

