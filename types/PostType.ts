import FeaturedImageType from "./FeaturedImageType";

interface PostType {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  date: string;
  featuredImage: FeaturedImageType;
  category: string;
}

export default PostType;
