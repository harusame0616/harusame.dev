import { type CommentDto } from "@/features/comment/models/comment";
import { fail, type Result, succeed } from "@/lib/result";
import { getSupabaseClient } from "@/lib/supabase";

export async function queryComments(
  slug: string,
): Promise<Result<CommentDto[]>> {
  const supabase = getSupabaseClient();

  const result = await supabase
    .from("article")
    .select("article_comment ( id, text, name, commented_at )")
    .eq("slug", slug)
    .order("created_at", { ascending: true });

  if (result.error) {
    return fail("コメントの取得に失敗しました");
  }

  const [article] = result.data;
  if (!article) {
    return fail("記事が見つかりません");
  }

  return succeed(
    article.article_comment.map((comment) => ({
      commentId: comment.id,
      text: comment.text,
      name: comment.name,
      commentedAt: comment.commented_at,
    })) || [],
  );
}

export async function postComment(
  slug: string,
  name: string,
  text: string,
) {
  const supabase = getSupabaseClient();

  const articleSelectResult = await supabase.from("article").select("id").eq(
    "slug",
    slug,
  )
    .single();

  if (articleSelectResult.error) {
    throw new Error("記事の取得に失敗しました");
  }

  await supabase.from("article_comment").insert({
    article_id: articleSelectResult.data.id,
    name,
    text,
  });
}
