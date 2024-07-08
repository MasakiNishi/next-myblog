import FeaturedImageType from "./FeaturedImageType";
import CategoryType from "./CategoryType";

interface PostType {
  id: string;
  title: string;
  subTitle: string;
  slug: string;
  date: string;
  featuredImage: FeaturedImageType;
  category: CategoryType;
}

export default PostType;
