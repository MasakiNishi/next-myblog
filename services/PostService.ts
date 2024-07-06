// repository
import RepositoryFactory from "../repositories/RepositoryFactory";
// type
import PostType from "../types/PostType";

class PostService {
  static async getList(): Promise<PostType[]> {
    try {
      const res = await RepositoryFactory.post.getList();
      return res.data.data.posts.edges.map((data: any) => {
        const post: PostType = {
          id: data.node.id,
          title: data.node.title,
          subtitle: data.node.subtitle.subtitle,
          slug: data.node.slug,
          date: data.node.date,
          featuredImage: {
            url: data.node.featuredImage.node.sourceUrl,
            alt: data.node.featuredImage.node.altText,
          },
          category: data.node.categories.edges[0].node.name,
        };
        return post;
      });
    } catch {
      return [];
    }
  }
}

export default PostService;
