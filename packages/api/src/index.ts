import * as v from "valibot";

export type Comment = {
	articleId: string;
	commentId: string;
	name: string;
	text: string;
	commentedAt: string;
};

export type CommentsResponse = {
	comments: Comment[];
};

const commentPostParamsSchema = v.object({
	articleId: v.string(),
	name: v.string(),
	text: v.string(),
});
export type CommentPostParams = v.InferInput<typeof commentPostParamsSchema>;

export default {
	async fetch(request, { DATABASE, WEB_ORIGIN }): Promise<Response> {
		const url = new URL(request.url);

		const headers = new Headers();
		headers.set("Access-Control-Allow-Origin", `${WEB_ORIGIN}`);
		headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
		headers.set("Access-Control-Allow-Headers", "Content-Type");

		const [, articleId] =
			/\/articles\/(.*!?)\/comments/.exec(url.pathname.toLowerCase()) || [];

		if (!articleId) {
			return new Response("bad request", { status: 400 });
		}

		if (request.method === "GET") {
			const stmt = DATABASE.prepare(
				"SELECT * FROM comment WHERE article_id = ?",
			);
			const queryCommentsResult = await stmt.bind(articleId).run();
			if (!queryCommentsResult.success) {
				return new Response("server error", { status: 500 });
			}
			const comments = queryCommentsResult.results.map(
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				(comment: any) =>
					({
						articleId: comment.article_id,
						commentId: comment.comment_id,
						name: comment.name,
						text: comment.text,
						commentedAt: comment.commented_at,
					}) satisfies Comment,
			);

			return Response.json({ comments } satisfies CommentsResponse, {
				headers,
			});
		}

		if (request.method === "POST") {
			const paramsResult = v.safeParse(
				v.object({
					articleId: v.string(),
					name: v.string(),
					text: v.string(),
				}),
				await request.json(),
			);

			if (!paramsResult.success) {
				return new Response("bad request", { status: 400 });
			}

			const stmt = DATABASE.prepare(
				"INSERT INTO comment (comment_id, article_id, name, text, commented_at) VALUES (?, ?, ?, ?, ?)",
			);
			const result = await stmt
				.bind(
					crypto.randomUUID(),
					paramsResult.output.articleId,
					paramsResult.output.name,
					paramsResult.output.text,
					new Date().toISOString(),
				)
				.run();

			return new Response("Ok", { status: 200, headers });
		}

		if (request.method === "OPTIONS") {
			if (request.headers.get("origin") !== WEB_ORIGIN) {
				return new Response("Forbidden", { status: 403 });
			}
			if (request.headers.get("access-control-request-method") !== "POST") {
				return new Response("Method Not Allowed", { status: 405, headers });
			}

			return new Response("Ok", { status: 200, headers });
		}

		return new Response("Method Not Allowed", { status: 405 });
	},
} satisfies ExportedHandler<Env>;
