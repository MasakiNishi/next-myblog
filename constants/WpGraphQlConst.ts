export class WpGraphQlPostConst {
  private static _postListItem = `
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
    }`;

  private static _onePostItem = `
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
    }`;

  // 記事一覧
  static postList = `query PostListQuery {
        posts {
            edges {
                node {
                    ${this._postListItem}
                }
            }
        }
    }`;

  // 特定のカテゴリーの記事一覧
  static postListByCategory = `query PostListByCategoryQuery($categoryId: Int!) {
        posts(where: {categoryId: $categoryId}) {
            edges {
                node {
                    ${this._postListItem}
                }
            }
        }
    }`;

  // 個別記事
  static onePost = `query PostQuery($id: ID!) {
        post(id: $id, idType: SLUG) {
            ${this._onePostItem}
        }
    }`;

  // スラッグからカテゴリーIDを取得
  static categoryIdBySlug = `query PostCategoryIdBySlugQuery($id: ID!) {
        category(id: $id, idType: SLUG) {
            categoryId
        }
    }`;

  // カテゴリー一覧を取得
  static categoryList = `query CategoryListQuery {
        categories {
            edges {
                node {
                    slug
                    name
                }
            }
        }
    }`;
}
