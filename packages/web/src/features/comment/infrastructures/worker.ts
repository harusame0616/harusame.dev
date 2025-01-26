import { type Result, fail, succeed } from "@/lib/result";
import type { CommentPostParams, CommentsResponse } from "api";
import type { CommentDto } from "../models/comment";

export async function queryComments(
	slug: string,
): Promise<Result<CommentDto[]>> {
	const commentsApi = new URL(
		`/articles/${slug}/comments`,
		import.meta.env.PUBLIC_API_URL,
	);
	try {
		const result = await fetch(commentsApi);
		const response = (await result.json()) as CommentsResponse;

		return succeed(
			response.comments.map((comment) => ({
				commentId: comment.commentId,
				text: comment.text,
				name: comment.name,
				commentedAt: comment.commentedAt,
			})),
		);
	} catch (e) {
		return fail("コメントの取得に失敗しました");
	}
}

export async function postComment(
	slug: string,
	name: string,
	text: string,
	token: string,
) {
	const commentPostApi = new URL(
		`/articles/${slug}/comments`,
		import.meta.env.PUBLIC_API_URL,
	);

	try {
		await fetch(commentPostApi, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				articleId: slug,
				name,
				text,
				token,
			} satisfies CommentPostParams),
		});
	} catch (e) {
		throw new Error("コメントの投稿に失敗しました");
	}
}
