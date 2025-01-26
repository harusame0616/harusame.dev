import * as v from "valibot";

export default {
	async fetch(request, { DATABASE }): Promise<Response> {
		const url = new URL(request.url);

		const [, articleId] =
			/\/articles\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/comments/
				.exec(url.pathname.toLowerCase()) || [];

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

			return Response.json(
				{
					comments: queryCommentsResult.results.map((comment) => ({
						articleId: comment.article_id,
						commentId: comment.comment_id,
						name: comment.name,
						text: comment.text,
						commentedAt: comment.commented_at,
					})),
				},
			);
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
			const result = await stmt.bind(
				crypto.randomUUID(),
				paramsResult.output.articleId,
				paramsResult.output.name,
				paramsResult.output.text,
				new Date().toISOString(),
			).run();

			return new Response("ok", { status: 200 });
		}

		return new Response("method not allowed", { status: 405 });
	},
} satisfies ExportedHandler<Env>;
