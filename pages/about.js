import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import axios from 'axios'
import Layout from '../components/Layout';
import styles from './about.module.scss';

const URL = 'https://pokeapi.co/api/v2/pokemon/'

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
  const { initialData } = props || {}
  const { data, error } = useSWR(
    URL,
    fetcher,
    { initialData }
  );
  let quote = data?.quote;
  console.log(999999999, data)
  if (!data) quote = 'Loading...';
  if (error) quote = 'Failed to fetch the quote.';
  return (
    <>
      <Layout>
        <div style={{ textAlign: 'center' }}>
          <h1>Trending Projects</h1>
          <div>
            {data && data.results
              ? data.results.map(pokemon => (
                <p key={pokemon.name}>
                  <Link href="/[pokemon]" as={`/${pokemon.name}`}>
                    <a>{pokemon.name}</a>
                  </Link>
                </p>
              ))
              : `${quote}`}
          </div>
        </div>
      </Layout>
    </>
  );
}
export async function getServerSideProps() {
  const data = await fetcher(URL)
  return { props: { initialData: data } }
}
export default About
