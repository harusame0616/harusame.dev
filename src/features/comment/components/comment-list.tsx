import { type CommentDto } from "../models/comment";
import { CommentListItem } from "./comment-list-item";

type Props =
  | { comments: CommentDto[]; skeleton?: false }
  | { comments?: undefined; skeleton: true };

export function CommentList({ skeleton, comments }: Props) {
  return (
    <ul className="flex flex-col gap-8" aria-label="コメント">
      {skeleton
        ? Array.from({ length: 3 }).map((_, i) => (
            <li
              className="border-b  pb-4 last:border-b-0"
              aria-busy={skeleton}
              aria-label="読込中"
              aria-hidden={i !== 0}
            >
              <CommentListItem skeleton />
            </li>
          ))
        : comments.map((comment) => (
            <li
              className="border-b pb-4 last:border-b-0"
              key={comment.commentId}
            >
              <CommentListItem comment={comment} />
            </li>
          ))}
    </ul>
  );
}
