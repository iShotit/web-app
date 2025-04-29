import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { endpoints, mutatormgt } from "@/axios";
import { queryKeys } from "@/React-Query";
import { IComment } from "@/types/type";

export function useGetSinglePostComments() {
  const { mutateAsync, isPending, isError, error } = useMutation<
    { data: IComment[] },
    any,
    { postid: string }
  >({
    mutationFn: (values) =>
      mutatormgt({
        method: "POST",
        data: values,
        url: endpoints.comments.comment,
      }),
  });

  return useMemo(
    () => ({
      fetchComments: mutateAsync,
      isFetchingComments: isPending,
      commentError: error,
      isError,
    }),
    [mutateAsync, isPending, error, isError]
  );
}

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    IComment,
    Error,
    { comment: string; postid: string }
  >({
    mutationFn: async ({ comment, postid }) => {
      const response = await mutatormgt({
        method: "POST",
        url: endpoints.comments.create,
        data: { comment, postid },
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return response.data as IComment;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.posts.SinglePost, variables.postid],
      });
    },
  });

  return useMemo(
    () => ({
      createComment: mutation.mutateAsync,
      isCreatingComment: mutation.isPending,
      errorCreateComment: mutation.error,
      isErrorCreateComment: mutation.isError,
    }),
    [mutation.mutateAsync, mutation.isPending, mutation.error, mutation.isError]
  );
};
