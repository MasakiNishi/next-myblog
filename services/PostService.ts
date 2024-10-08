// const
import PostConst from "../constants/PostConst";
// type
import PostType from "../types/PostType";
import PostListType from "../types/PostListType";
import CategoryType from "../types/CategoryType";
import OffsetPaginationType from "../types/OffsetPaginationType";
// repository
import RepositoryFactory from "../repositories/RepositoryFactory";

class PostService {
  // 記事一覧を取得
  static async getList({
    page,
    categoryId,
    search,
  }: {
    page: number;
    categoryId?: number;
    search?: string;
  }): Promise<[PostListType[], number]> {
    try {
      const offsetPagination = this._makeOffsetPaginationFromPage(page);
      const res = await RepositoryFactory.post.getList({
        offsetPagination: offsetPagination,
        categoryId: categoryId,
        search: search,
      });
      const postList = res.data.data.posts.edges.map((data: any) => {
        const post: PostListType = {
          id: data.node.id,
          title: data.node.title,
          subTitle: data.node.subtitle.subtitle,
          slug: data.node.slug,
          date: data.node.date,
          featuredImage: {
            thumbnail: data.node.featuredImage.node.customImageSizes.thumbnail,
            doubleThumbnail:
              data.node.featuredImage.node.customImageSizes["2x-thumbnail"],
            width: data.node.featuredImage.node.mediaDetails.sizes[0].width,
            height: data.node.featuredImage.node.mediaDetails.sizes[0].height,
            alt: data.node.featuredImage.node.altText,
          },
          category: {
            slug: data.node.categories.edges[0].node.slug,
            name: data.node.categories.edges[0].node.name,
          },
        };
        return post;
      });
      const total = res.data.data.posts.pageInfo.offsetPagination.total;
      return [postList, total];
    } catch {
      return [[], 0];
    }
  }

  // slugから記事単体を取得
  static async getOne({ id }: { id: string }): Promise<PostType | null> {
    try {
      const res = await RepositoryFactory.post.getOne({ id });
      const data = res.data.data.post;
      const featuredImage =
        data.featuredImage && data.featuredImage.node
          ? {
              medium: data.featuredImage.node.customImageSizes.medium,
              large: data.featuredImage.node.customImageSizes.large,
              doubleMedium:
                data.featuredImage.node.customImageSizes["2x-medium"],
              doubleLarge: data.featuredImage.node.customImageSizes["2x-large"],
              ogp: data.featuredImage.node.customImageSizes.ogp,
              full: data.featuredImage.node.customImageSizes.full,
              width: data.featuredImage.node.mediaDetails.sizes[0].width,
              height: data.featuredImage.node.mediaDetails.sizes[0].height,
              alt: data.featuredImage.node.altText,
            }
          : null;
      const post: PostType = {
        id: data.id,
        title: data.title,
        subTitle: data.subtitle.subtitle,
        slug: data.slug,
        date: data.date,
        modifiedDate: data.modified,
        content: data.content,
        description: data.description.description,
        featuredImage: featuredImage,
        category: {
          slug: data.categories.edges[0].node.slug,
          name: data.categories.edges[0].node.name,
        },
      };
      return post;
    } catch {
      return null;
    }
  }

  // スラッグからカテゴリーIDを取得する
  static async getCategoryIdBySlug({
    slug,
  }: {
    slug: string;
  }): Promise<number> {
    const res = await RepositoryFactory.post.getCategoryIdBySlug({ slug });
    return res.data.data.category.categoryId;
  }

  // カテゴリー一覧を取得する
  static async getCategoryList(): Promise<CategoryType[] | null> {
    try {
      const res = await RepositoryFactory.post.getCategoryList();
      return res.data.data.categories.edges.map((data: any) => {
        const categoryList: CategoryType = {
          slug: data.node.slug,
          name: data.node.name,
        };
        return categoryList;
      });
    } catch {
      return null;
    }
  }

  // ページネーションの設定
  private static _makeOffsetPaginationFromPage(
    page: number
  ): OffsetPaginationType {
    return {
      offset: (page - 1) * PostConst.sizePerPage,
      size: PostConst.sizePerPage,
    };
  }
}

export default PostService;
