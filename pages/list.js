import { Component } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Post from '../components/Link'

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  const res = await axios
    .get(`https://jsonplaceholder.typicode.com/posts?_page=1`)
    .catch((err) => {
      console.log(10, err)
    });
  const { data = [] } = res || {};

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data
    },
  }
}

export default class extends Component {
  render() {
    return (
      <main>
        <Head>
          <title>Home list</title>
        </Head>

        <h1>List of posts</h1>

        <section>
          {this.props.data.map(post => <Post {...post} key={post.id} />)}
        </section>
      </main>
    )
  }
}
