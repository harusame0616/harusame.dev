import * as v from "valibot";

export default {
	async fetch(request, env): Promise<Response> {
		const { DATABASE } = env;
		if (request.method === "GET") {
			const url = new URL(request.url);
			const paths = url.pathname.split("/");
			const articleId = paths[1];
			console.log({ articleId });

			if (!articleId) {
				return new Response(`bad request${articleId}`, { status: 400 });
			}

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
			console.log("post");
			const body = await request.json();
			const parseResult = v.safeParse(
				v.object({
					articleId: v.string(),
					name: v.string(),
					text: v.string(),
				}),
				body,
			);

			if (!parseResult.success) {
				return new Response("bad request", { status: 400 });
			}

			const stmt = DATABASE.prepare(
				"INSERT INTO comment (comment_id, article_id, name, text, commented_at) VALUES (?, ?, ?, ?, ?)",
			);
			const result = await stmt.bind(
				crypto.randomUUID(),
				parseResult.output.articleId,
				parseResult.output.name,
				parseResult.output.text,
				new Date().toISOString(),
			).run();

			console.log({ result });
		}

		return new Response("ok", { status: 200 });
	},
} satisfies ExportedHandler<Env>;
