import { useRouter } from 'next/router';
import Markdown from 'react-markdown';
import axios from 'axios'
import Layout from '../../components/Layout';


export async function getStaticPaths() {
  const res = await axios
    .get(`https://api.tvmaze.com/search/shows?q=batman`)
    .catch((err) => {
      console.log(10, err)
    });
  const { data = [] } = res || {};
  console.log(1414, data)
  return {
    paths: data.map(post => {
      return {
        params: {
          id: `${post.show.id}`,
        },
      }
    }),
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  // fetch single post detail
  const res = await axios
    .get(`https://api.tvmaze.com/shows/${params.id}`)
    .catch((err) => {
      console.log(10, err)
    });
  const { data = {} } = res || {};
  console.log(3636, data)
  return {
    props: {show: data},
  }
}


const Post = (props) => {
  console.log(4444, props)
  const router = useRouter();
  const { show = {} } = props || {};
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <Layout>
      <h1>{show.name}</h1>
      <p>{show.summary.replace(/<[/]?[pb]>/g, '')}</p>
      {show.image ? <img src={props.show.image.medium}/> : null}
      <div className="markdown">
        <Markdown
          source={`
          This is our blog post.
          Yes. We can have a [link](/link).
          And we can have a title as well.
          
          ### This is a title
          
          And here's the content.
          ---
      `}
        />
      </div>
      <style jsx global>{`
        .markdown {
          font-family: 'Arial';
        }

        .markdown a {
          text-decoration: none;
          color: blue;
        }

        .markdown a:hover {
          opacity: 0.6;
        }

        .markdown h3 {
          margin: 0;
          padding: 0;
          text-transform: uppercase;
        }
      `}</style>
    </Layout>
  );
};

export default Post
