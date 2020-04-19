import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios'
import Layout from '../components/Layout';
import styles from './about.module.scss';

const fetcher = async (url) => {
  return await axios(url).then(res => {
    const { data } = res || {}
    return data || {}
  });
}

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
  const { data, error } = useSWR(
    `/api/randomQuote${query.author ? '?author=' + query.author : ''}`
    , fetcher
  );
  const author = data?.author;
  let quote = data?.quote;

  if (!data) quote = 'Loading...';
  if (error) quote = 'Failed to fetch the quote.';
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
  const { data = {} } = res || {};
  console.log(`Author:: ${data.author}`);

  return {
    data: data
  };
};
export default About
