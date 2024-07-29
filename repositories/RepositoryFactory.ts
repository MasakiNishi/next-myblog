import PostRepository from "./PostRepository";
import PageRepository from "./PageRepository";

const RepositoryFactory = {
  post: PostRepository,
  page: PageRepository,
};

export default RepositoryFactory;
