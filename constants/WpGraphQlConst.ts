export class WpGraphQlPostConst {
  // 記事一覧
  static postList = `query PostListQuery {
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

  // 個別記事
  static onePost = `query PostQuery($id: ID!) {
      post(id: $id, idType: SLUG) {
        categories {
          edges {
            node {
              name
              slug
            }
          }
        }
        date
        modified
        content
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
    }`;
}
