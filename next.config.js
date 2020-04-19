// const axios = require('axios')
module.exports = {
  exportTrailingSlash: true,
  async exportPathMap(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    // we fetch our list of posts, this allow us to dynamically generate the exported pages
    // const resLink = await axios
    //   .get('https://jsonplaceholder.typicode.com/posts?_page=1')
    //   .catch((err) => {
    //     console.log(10, err)
    //   });
    //
    // const { data: resLinkData = [] } = resLink || {};

    // tranform the list of posts into a map of pages with the pathname `/post/:id`
    // const pagesLink = resLinkData.reduce(
    //   (pages, post) =>
    //     Object.assign({}, pages, {
    //       [`/link/${post.id}`]: {
    //         page: '/link',
    //         query: { id: post.id }
    //       }
    //     }),
    //   {}
    // )

    // const resIndex = await axios
    //   .get(`https://api.tvmaze.com/search/shows?q=batman`)
    //   .catch((err) => {
    //     console.log(10, err)
    //   });
    // const { data: resIndexData = [] } = resIndex || {};
    // const pagesIndex= resIndexData.map(item => item.show).reduce(
    //   (pages, post) =>
    //     Object.assign({}, pages, {
    //       [`/p/${post.id}`]: {
    //         page: '/p',
    //         query: { id: post.id }
    //       }
    //     }),
    //   {}
    // )

    // console.log(48, 'pagesLink::', JSON.stringify(pagesLink))
    // console.log(48, 'pagesLink::', JSON.stringify(pagesIndex))

    // combine the map of post pages with the home
    return Object.assign({}, {
      '/': { page: '/' },
      '/link': { page: '/link' },
      // ...pagesIndex,
      // ...pagesLink
    })
  }
};
