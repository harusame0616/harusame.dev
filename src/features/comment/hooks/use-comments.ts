import { type CommentDto } from "@/features/comment/models/comment";
import useSWR from "swr";
import { queryComments } from "../infrastractures/get-comments";

export function useComments(articleSlug: string):
  | {
      comments: CommentDto[];
      error: null;
      isLoading: false;
    }
  | { comments: null; error: Error; isLoading: false }
  | { comments: null; error: null; isLoading: true } {
  const result = useSWR(`${articleSlug}`, queryComments);

  if (result.isLoading) {
    return { comments: null, error: null, isLoading: true };
  }

  if (result.error || !result.data) {
    return { comments: null, error: result.error, isLoading: false };
  }

  return {
    comments: result.data,
    error: null,
    isLoading: false,
  };
}
