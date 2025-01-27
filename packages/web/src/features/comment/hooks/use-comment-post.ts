import useSWRMutation from "swr/mutation";
import { postComment } from "../infrastructures/worker";

async function mutator(
	slug: string,
	{
		arg: { name, text, token },
	}: { arg: { name: string; text: string; token: string } },
) {
	await postComment(slug, name, text, token);
}

export function useCommentPost(slug: string) {
	const { trigger, isMutating } = useSWRMutation(slug, mutator);

	async function post(name: string, text: string, token: string) {
		await trigger({ name, text, token });
	}

	return { post, isMutating };
}
