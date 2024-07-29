import FeaturedImageType from "./FeaturedImageType";

interface PageType {
  id: string;
  title: string;
  slug: string;
  date: string;
  modifiedDate: string;
  content: string;
  description: string;
  featuredImage: FeaturedImageType | null;
}

export default PageType;
