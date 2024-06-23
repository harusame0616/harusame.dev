import { type CommentDto } from "@/features/comment/models/comment";
import { getSupabaseClient } from "@/lib/supabase";

export async function queryComments(slug: string): Promise<CommentDto[]> {
  const supabase = getSupabaseClient();

  const result = await supabase
    .from("article")
    .select("article_comment ( id, text, name, commented_at )")
    .eq("slug", slug)
    .order("created_at", { ascending: true });

  if (result.error) {
    throw new Error("コメントの取得に失敗しました");
  }

  const [article] = result.data;
  if (!article) {
    throw new Error("記事が見つかりません");
  }

  return (
    article.article_comment.map((comment) => ({
      commentId: comment.id,
      text: comment.text,
      name: comment.name,
      commentedAt: comment.commented_at,
    })) || []
  );
}
