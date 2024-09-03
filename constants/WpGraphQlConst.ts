export class WpGraphQlAuthConst {
  // ユーザーログイン用のJWTトークン取得クエリ
  static loginUser = `
    mutation LoginUser {
      login(input: {username: "${process.env.API_USERNAME}", password: "${process.env.API_PASSWORD}"}) {
        authToken
        refreshToken
      }
    }
  `;

  // JWTリフレッシュ用のクエリを返す関数
  static refreshTokenQuery = (refreshToken: string) => `
    mutation RefreshAuthToken {
      refreshJwtAuthToken(input: {jwtRefreshToken: "${refreshToken}"}) {
        authToken
      }
    }
  `;
}

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
            customImageSizes(sizes: ["thumbnail", "2x-thumbnail"])
            altText
            mediaDetails {
              sizes(include: _2X_THUMBNAIL) {
                height
                width
              }
            }
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
            customImageSizes(sizes: ["medium", "large", "2x-medium", "2x-large", "ogp", "full"])
            altText
            mediaDetails {
              sizes(include: LARGE) {
                height
                width
              }
            }
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
            customImageSizes(sizes: ["medium", "large", "2x-medium", "2x-large", "ogp", "full"])
            altText
            mediaDetails {
              sizes(include: LARGE) {
                height
                width
              }
            }
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

export class WpGraphQlSitemapConst {
  // サイトマップ用のスラッグ一覧取得
  private static _allSlugItem = `
    edges {
        node {
            slug
            modified
        }
    }
    pageInfo {
        offsetPagination {
            total
        }
    }`;

  // 記事のスラッグ一覧取得
  static allPostSlug = `query allPostSlug($offsetPagination: OffsetPagination!) {
        posts(where: {offsetPagination: $offsetPagination}) {
            ${this._allSlugItem}
        }
    }`;

  // カテゴリーごとの記事のスラッグ一覧取得
  static allPostSlugByCategory = `query allPostSlug($offsetPagination: OffsetPagination!, $categoryId: Int!) {
        posts(where: {offsetPagination: $offsetPagination, categoryId: $categoryId}) {
            ${this._allSlugItem}
        }
    }`;

  // 固定ページのスラッグ一覧取得
  static allPageSlug = `query allPageSlug {
        pages {
            ${this._allSlugItem}
        }
    }`;
}
