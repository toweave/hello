import axios from 'axios'
import { useRouter } from 'next/router';
import Markdown from 'react-markdown';
import Layout from '../../components/Layout';


export async function getStaticPaths() {
  const res = await axios
    .get(`https://api.tvmaze.com/search/shows?q=batman`)
    .catch((err) => {
      console.log(10, err)
    });
  const { data = [] } = res || {};
  return {
    paths: data.map(post => {
      return {
        params: {
          id: `${post.id}`,
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
  console.log(34, res)
  const { data = [] } = res || {};
  return {
    props: {show: data},
  }
}


const Post = (props) => {
  console.log(42, props);
  const router = useRouter();
  const { show = {} } = props || {};
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
