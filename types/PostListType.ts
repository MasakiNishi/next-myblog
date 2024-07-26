import FeaturedImageType from "./FeaturedImageType";
import CategoryType from "./CategoryType";

interface PostListType {
  id: string;
  title: string;
  subTitle: string;
  slug: string;
  date: string;
  featuredImage: FeaturedImageType;
  category: CategoryType;
}

export default PostListType;
