// repository
import RepositoryFactory from "../repositories/RepositoryFactory";
// type
import PostType from "../types/PostType";
import PostListType from "../types/PostListType";

class PostService {
  // 記事一覧を取得
  static async getList(): Promise<PostListType[]> {
    try {
      const res = await RepositoryFactory.post.getList();
      return res.data.data.posts.edges.map((data: any) => {
        const post: PostListType = {
          id: data.node.id,
          title: data.node.title,
          subTitle: data.node.subtitle.subtitle,
          slug: data.node.slug,
          date: data.node.date,
          featuredImage: {
            url: data.node.featuredImage.node.sourceUrl,
            alt: data.node.featuredImage.node.altText,
          },
          category: {
            slug: data.node.categories.edges[0].node.slug,
            name: data.node.categories.edges[0].node.name,
          },
        };
        return post;
      });
    } catch {
      return [];
    }
  }

  // slugから記事単体を取得
  static async getOne({ id }: { id: string }): Promise<PostType | null> {
    try {
      const res = await RepositoryFactory.post.getOne({ id });
      const data = res.data.data.post;
      const post: PostType = {
        id: data.id,
        title: data.title,
        subTitle: data.subtitle.subtitle,
        slug: data.slug,
        date: data.date,
        modifiedDate: data.modified,
        content: data.content,
        featuredImage: {
          url: data.featuredImage.node.sourceUrl,
          alt: data.featuredImage.node.altText,
        },
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
}

export default PostService;
