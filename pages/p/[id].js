import axios from 'axios'
import { useRouter } from 'next/router';
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
      {show.image ? <img src={props.show.image.medium} /> : null}
    </Layout>
  );
};

Post.getInitialProps = async function(context) {
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
