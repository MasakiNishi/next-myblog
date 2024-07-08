export class WpGraphQlPostConst {
  static list = `query PostListQuery {
      posts {
        edges {
          node {
            categories {
              edges {
                node {
                    name
                    slug
                }
              }
            }
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            id
            slug
            title
            subtitle {
                subtitle
            }
          }
        }
      }
    }`;
}
