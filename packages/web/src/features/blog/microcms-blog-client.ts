// SDK利用準備
import { createClient } from "microcms-js-sdk";
import type { BlogClient, Post, Tag } from "./blog-client";

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
	ai: boolean;
};

export class MicroCMSBlogClient implements BlogClient {
	private readonly client: ReturnType<typeof createClient>;

	constructor(props: { serviceDomain: string; apiKey: string }) {
		this.client = createClient({
			serviceDomain: props.serviceDomain,
			apiKey: props.apiKey,
		});
	}

	async getAllPost(): Promise<Post[]> {
		const posts = await this.client.getAllContents<
			Pick<
				MicroCMSPost,
				"category" | "content" | "tags" | "title" | "id" | "publishedAt" | "ai"
			>
		>({
			endpoint: "blogs",
			queries: { fields: "category,content,tags,title,id,publishedAt,ai" },
		});

		return posts.map((post) => ({
			id: post.id,
			title: post.title,
			content: post.content,
			publishedAt: new Date(post.publishedAt),
			category: { id: post.category.id, name: post.category.name },
			tags: post.tags.map((tag) => ({
				id: tag.id,
				name: tag.name,
			})),
			ai: post.ai,
		}));
	}

	async getAllTags(): Promise<Tag[]> {
		const tags = await this.client.getAllContents<MicroCMSTag>({
			endpoint: "tags",
		});

		return tags.map((tag) => ({
			id: tag.id,
			name: tag.name,
		}));
	}
}
