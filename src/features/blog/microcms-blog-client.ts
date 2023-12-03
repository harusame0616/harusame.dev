//SDK利用準備
import { createClient } from "microcms-js-sdk";
import type {
  BlogClient,
  GetAllPostResponse,
  GetPostProps,
  GetPostResponse,
  GetPostsProps,
  GetPostsResponse,
  PostListItem,
} from "./blog-client";

type MicroCMSCategory = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

type MicroCMSTag = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

type MicroCMSPost = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  category: MicroCMSCategory;
  tags: MicroCMSTag[];
};

const postListItemFields: (keyof MicroCMSPost)[] = [
  "id",
  "title",
  "content",
  "publishedAt",
  "category",
  "tags",
];
type MicroCMSPostListItem = Pick<
  MicroCMSPost,
  (typeof postListItemFields)[number]
>;

type ConstructorProps = {
  serviceDomain: string;
  apiKey: string;
};

function toPostListItem(post: MicroCMSPostListItem): PostListItem {
  return {
    category: post.category ?? {
      id: "",
      name: "",
    },
    content: post.content,
    id: post.id,
    tags: post.tags ?? [],
    title: post.title,
    publishedAt: new Date(post.publishedAt),
  };
}

export class MicroCMSBlogClient implements BlogClient {
  private readonly client: ReturnType<typeof createClient>;

  constructor(props: ConstructorProps) {
    this.client = createClient({
      serviceDomain: props.serviceDomain,
      apiKey: props.apiKey,
    });
  }
  async getAllPost(): GetAllPostResponse {
    const posts = await this.client.getAllContents<MicroCMSPostListItem>({
      endpoint: "blogs",
      queries: {
        fields: postListItemFields.join(","),
      },
    });

    return {
      posts: posts.map(toPostListItem),
      totalCount: posts.length,
    };
  }

  async getPost(props: GetPostProps): GetPostResponse {
    const response = await this.client.get<MicroCMSPost>({
      endpoint: "blogs",
      contentId: props.id,
    });

    return {
      title: response.title,
      content: response.content,
      id: response.id,
      publishedAt: new Date(response.publishedAt),
      category: response.category,
      tags: response.tags,
    };
  }

  async getPosts({ count, page }: GetPostsProps): GetPostsResponse {
    const { contents, totalCount } =
      await this.client.getList<MicroCMSPostListItem>({
        endpoint: "blogs",
        queries: {
          fields: postListItemFields.join(","),
          limit: count,
          offset: count * (page - 1),
        },
      });

    return {
      posts: contents.map(toPostListItem),
      totalCount: totalCount,
    };
  }
}
