export type Category = {
	id: string;
	name: string;
};

export type Tag = {
	id: string;
	name: string;
};

export type Post = {
	id: string;
	publishedAt: Date;
	title: string;
	content: string;
	category: Category;
	tags: Tag[];
};

export interface BlogClient {
	getPost(id: string): Promise<Post>;
	getAllPost(): Promise<Post[]>;
	getAllTags(): Promise<Tag[]>;
}
