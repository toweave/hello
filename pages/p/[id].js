import axios from 'axios'
import { useRouter } from 'next/router';
import Markdown from 'react-markdown';
import Layout from '../../components/Layout';

const Post = (props) => {
  const router = useRouter();
  console.log(666666666666666, router);
  console.log(777777777777777, props);
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

Post.getInitialProps = async function (context) {
  console.log('context:::', context)
  const { id } = context.query;
  const res = await axios
    .get(`https://api.tvmaze.com/shows/${id}`)
    .catch((err) => {
      console.log(10, err)
    });
  console.log(3666, res);
  const { data: show = {} } = res || {};

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post
