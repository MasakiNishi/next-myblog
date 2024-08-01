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
    }
    description {
        description
    }`;

  // 記事一覧
  static postList = `query PostListQuery($offsetPagination: OffsetPagination!) {
        posts(where: {offsetPagination: $offsetPagination}) {
            edges {
                node {
                    ${this._postListItem}
                }
            }
            pageInfo {
                offsetPagination {
                    total
                }
            }
        }
    }`;

  // 特定のカテゴリーの記事一覧
  static postListByCategory = `query PostListByCategoryQuery($offsetPagination: OffsetPagination!, $categoryId: Int!) {
        posts(where: {offsetPagination: $offsetPagination, categoryId: $categoryId}) {
            edges {
                node {
                    ${this._postListItem}
                }
            }
            pageInfo {
                offsetPagination {
                    total
                }
            }
        }
    }`;

  // 検索結果の記事一覧
  static searchPostList = `query SearchPostsQuery($offsetPagination: OffsetPagination!, $search: String!) {
        posts(where: {offsetPagination: $offsetPagination, search: $search}) {
            edges {
                node {
                    ${this._postListItem}
                }
            }
            pageInfo {
                offsetPagination {
                    total
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

  // 記事の総数を取得
  static postTotal = `query PostTotalQuery {
        posts {
            pageInfo {
                offsetPagination {
                    total
                }
            }
        }
    }`;
}

export class WpGraphQlPageConst {
  private static _onePageItem = `
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
    description {
        description
    }`;

  // 固定ページ
  static onePage = `query PageQuery($id: ID!) {
        page(id: $id, idType: URI) {
            ${this._onePageItem}
        }
    }`;
}

export class WpGraphQlProfileConst {
  // ユーザー
  static userProfile = `query UserProfileQuery($id: ID!) {
        user(id: $id) {
            id
            avatar {
                url
            }
            firstName
            lastName
            name
            description   
        }
    }`;
}
