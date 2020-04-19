import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios'
import Layout from '../components/Layout';
import styles from './about.module.scss';

const fetcher = async (url) => {
  console.log(7, 'url::', url);
  return await axios(url).then(res => {
    console.log(res)
    const { data } = res || {}
    return data || {}
  });
}

console.log(3, styles)
const AboutPageContent = (props) => {
  const { data = {}, author = '-' } = props
  return (
    <>
      <p className={styles.test}>{author}::This is the about page</p>
      <p className={styles.test}>{data.author}</p>
      <p className={styles.test}>{data.quote}</p>
    </>
  )
}

const About = (props) => {
  const { query } = useRouter();
  // const { data } = props
  console.log(999999, JSON.stringify(props.data, null, 2))
  const { data, error } = useSWR(
    `/api/randomQuote${query.author ? '?author=' + query.author : ''}`
    , fetcher
  );
  const author = data?.author;
  let quote = data?.quote;

  if (!data) quote = 'Loading...';
  if (error) quote = 'Failed to fetch the quote.';
  console.log(26, data, error)
  return (
    <>
      <Layout>
        <AboutPageContent data={data} author={author} />
      </Layout>
    </>
  );
}

About.getInitialProps = async function (conext) {
  const res = await axios
    .get('/api/randomQuote')
    .catch((err) => {
      console.log(10, err)
    });
  console.log(3666, res);
  const { data = {} } = res || {};
  console.log(data)
  console.log(`Author:: ${data.author}`);

  return {
    data: data
  };
};
export default About
