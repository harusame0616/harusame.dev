import type { BlogClient } from "./blog-client";
import { MicroCMSBlogClient } from "./microcms-blog-client";
import { MockBlogClient } from "./mock-blog-client";

export function createBlogClient(): BlogClient {
	return import.meta.env.MOCK_BLOG_CLIENT === "true"
		? new MockBlogClient()
		: new MicroCMSBlogClient({
				apiKey: import.meta.env.MICROCMS_API_KEY as string,
				serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN as string,
			});
}
