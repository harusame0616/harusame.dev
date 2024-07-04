import useSWRMutation from "swr/mutation";
import { postComment } from "../infrastractures/supabase";

async function mutator(
    slug: string,
    { arg: { name, text } }: { arg: { name: string; text: string } },
) {
    await postComment(slug, name, text);
}

export function useCommentPost(slug: string) {
    const { trigger, isMutating, error } = useSWRMutation(slug, mutator);

    async function post(name: string, text: string) {
        await trigger({ name, text });
    }

    return { post, isMutating, error };
}
