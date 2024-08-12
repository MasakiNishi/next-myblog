import PostRepository from "./PostRepository";
import PageRepository from "./PageRepository";
import ProfileRepository from "./ProfileRepository";
import SitemapRepository from "./SitemapRepository";

const RepositoryFactory = {
  post: PostRepository,
  page: PageRepository,
  profile: ProfileRepository,
  sitemap: SitemapRepository,
};

export default RepositoryFactory;
