import PostRepository from "./PostRepository";
import PageRepository from "./PageRepository";
import ProfileRepository from "./ProfileRepository";

const RepositoryFactory = {
  post: PostRepository,
  page: PageRepository,
  profile: ProfileRepository,
};

export default RepositoryFactory;
