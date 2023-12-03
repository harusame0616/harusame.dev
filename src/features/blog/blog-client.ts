type Category = {
  id: string;
  name: string;
};

type Tag = {
  id: string;
  name: string;
};

type Post = {
  id: string;
  publishedAt: Date;
  title: string;
  content: string;
  category: Category;
  tags: Tag[];
};

const postListFields: (keyof Post)[] = [
  "id",
  "title",
  "publishedAt",
  "content",
  "category",
  "tags",
];
type PostListField = (typeof postListFields)[number];

export type PostListItem = Pick<Post, PostListField>;

export type GetPostProps = {
  id: string;
};

export type GetPostsProps = {
  count: number;
  page: number;
};

export type GetPostResponse = Promise<Post>;

export type GetPostsResponse = Promise<{
  posts: PostListItem[];
  totalCount: number;
}>;

export type GetAllPostResponse = GetPostsResponse;

export interface BlogClient {
  getPost(props: GetPostProps): GetPostResponse;
  getPosts(props: GetPostsProps): GetPostsResponse;
  getAllPost(): GetAllPostResponse;
}
