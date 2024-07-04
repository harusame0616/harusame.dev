import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { type CommentDto } from "../models/comment";

type Props =
  | { comment: CommentDto; skeleton?: false }
  | { comment?: undefined; skeleton: true };

export function CommentListItem({ skeleton, comment }: Props) {
  return (
    <article className="flex flex-col">
      <div className="flex">
        <dl className="mb-1 flex gap-8">
          <div className="flex items-center gap-1">
            <dt className="text-xs text-muted-foreground">投稿者</dt>
            <dl>
              {skeleton ? <Skeleton className="h-6 w-24" /> : comment.name}
            </dl>
          </div>
          <div className="flex items-center gap-1">
            <dt className="text-xs text-muted-foreground">投稿日</dt>
            <dl>
              {skeleton ? (
                <Skeleton className="h-6 w-24" />
              ) : (
                format(comment.commentedAt, "yyyy-MM-dd HH:mm")
              )}
            </dl>
          </div>
        </dl>
      </div>
      <div className="flex flex-col gap-px whitespace-pre-wrap p-4">
        {skeleton ? (
          <>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-6 w-72" />
            <Skeleton className="h-6 w-52" />
          </>
        ) : (
          comment.text
        )}
      </div>
    </article>
  );
}
