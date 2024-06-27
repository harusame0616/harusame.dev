import type { Result } from "@/lib/result";
import type { Article } from "@features/article/models/article";

export interface ArticleRepository {
  listAll(): Promise<Result<Article[]>>;
  saveMany(articles: Article[]): Promise<Result>;
  deleteManyBySlug(slugs: string[]): Promise<Result>;
}
