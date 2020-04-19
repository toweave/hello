import { Component } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'

export async function getStaticPaths() {
  const res = await axios
    .get(`https://jsonplaceholder.typicode.com/posts?_page=1`)
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
    .get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    .catch((err) => {
      console.log(10, err)
    });
  const { data = [] } = res || {};
  return {
    props: data,
  }
}

export default (props) =>  {
  const router = useRouter()
  const { title, body } = props
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <main>
      <Head>
        <title>{title}</title>
      </Head>

      <h1>{title}</h1>

      <p>{body}</p>

      <Link href="/">
        <a>Go back to home</a>
      </Link>
    </main>
  )
}
