import FeaturedImageType from "./FeaturedImageType";
import CategoryType from "./CategoryType";

interface PostType {
  id: string;
  title: string;
  subTitle: string;
  slug: string;
  date: string;
  modifiedDate: string;
  content: string;
  description: string;
  featuredImage: FeaturedImageType | null;
  category: CategoryType;
}

export default PostType;
