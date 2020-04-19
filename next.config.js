const axios = require('axios')

module.exports = {
  exportTrailingSlash: true,
  async exportPathMap() {
    // we fetch our list of posts, this allow us to dynamically generate the exported pages
    const res = await axios
      .get('https://jsonplaceholder.typicode.com/posts?_page=1')
      .catch((err) => {
        console.log(10, err)
      });

    const { data = [] } = res || {};

    // tranform the list of posts into a map of pages with the pathname `/post/:id`
    const pages = data.reduce(
      (pages, post) =>
        Object.assign({}, pages, {
          [`/post/${post.id}`]: {
            page: '/post',
            query: { id: post.id }
          }
        }),
      {}
    )

    // combine the map of post pages with the home
    return Object.assign({}, pages, {
      '/': { page: '/' }
    })
  }
};
