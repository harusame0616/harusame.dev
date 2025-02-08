import { Hono } from "hono";
import { cors } from "hono/cors";
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
	token: v.string(),
});
export type CommentPostParams = v.InferInput<typeof commentPostParamsSchema>;

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors({ origin: (_, { env: { WEB_ORIGIN } }) => WEB_ORIGIN }));

app.get(
	"/articles/:articleId/comments",
	async ({ req: request, env: { DATABASE } }) => {
		const articleId = request.param("articleId");

		const stmt = DATABASE.prepare("SELECT * FROM comment WHERE article_id = ?");
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

		return Response.json({ comments } satisfies CommentsResponse);
	},
);

app.use(
	"/articles/:articleId/comments",
	async ({ req: request, env: { TURNSTILE_SECRET } }, next) => {
		const paramsResult = v.safeParse(
			v.object({ token: v.string() }),
			await request.json(),
		);

		if (!paramsResult.success) {
			return new Response("bad request", { status: 400 });
		}

		const formData = new FormData();
		formData.append("secret", TURNSTILE_SECRET);
		formData.append("response", paramsResult.output.token);
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		formData.append("remoteip", request.header("CF-Connecting-IP")!);
		const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
		const turnstileResult = await fetch(url, {
			body: formData,
			method: "POST",
		});

		if (!((await turnstileResult.json()) as { success: boolean }).success) {
			return new Response("Forbidden", { status: 403 });
		}

		await next();
	},
);

app.post(
	"/articles/:articleId/comments",
	async ({ req: request, env: { DATABASE } }) => {
		const paramsResult = v.safeParse(
			commentPostParamsSchema,
			await request.json(),
		);

		if (!paramsResult.success) {
			return new Response("bad request", { status: 400 });
		}

		const stmt = DATABASE.prepare(
			"INSERT INTO comment (comment_id, article_id, name, text, commented_at) VALUES (?, ?, ?, ?, ?)",
		);
		await stmt
			.bind(
				crypto.randomUUID(),
				paramsResult.output.articleId,
				paramsResult.output.name,
				paramsResult.output.text,
				new Date().toISOString(),
			)
			.run();

		return new Response("Ok", { status: 200 });
	},
);

export default app;
