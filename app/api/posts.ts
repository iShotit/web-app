import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { IPosts, Post } from "@/types/type";
import { endpoints, fetchermgt, mutatormgt } from "@/axios";
import { queryKeys } from "@/React-Query";
import { usePostStore } from "@/store/post";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const addPost = usePostStore((state) => state.addPost);

  const mutation = useMutation<
    any,
    Error,
    {
      post: string;
      longitude?: string;
      latitude?: string;
      isPrivate?: boolean;
      media?: File;
    }
  >({
    mutationFn: async ({ post, longitude, latitude, isPrivate, media }) => {
      const formData = new FormData();
      formData.append("post", post);
      if (longitude) formData.append("longitude", longitude);
      if (latitude) formData.append("latitude", latitude);
      if (typeof isPrivate === "boolean")
        formData.append("isPrivate", String(isPrivate));
      if (media) formData.append("media", media);

      const response: any = await mutatormgt({
        method: "POST",
        url: endpoints.posts.create,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (newPost: Post) => {
      addPost(newPost);
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.posts });
    },
  });

  return useMemo(
    () => ({
      createPost: mutation.mutateAsync,
      isCreatingPost: mutation.isPending,
      error: mutation.error,
      isError: mutation.isError,
    }),
    [mutation.mutateAsync, mutation.isPending, mutation.error, mutation.isError]
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useGetAllPost(option?: { enabled: boolean }) {
  const setPosts = usePostStore((state) => state.setPosts);

  const { data, isLoading, refetch, isRefetching, error, isError } =
    useQuery<IPosts>({
      queryKey: queryKeys.posts.posts,
      queryFn: () => fetchermgt(endpoints.posts.posts),
      select: (data) => {
        setPosts(data);
        return data;
      },
    });

  return useMemo(
    () => ({
      posts: data,
      postRefetch: refetch,
      isFetchingPosts: isLoading,
      isRefetching,
      error,
      isError,
    }),
    [data, isLoading, refetch, isRefetching, error, isError]
  );
}

export function useGetSinglePosts() {
  // const queryClient = useQueryClient();
  const { mutateAsync, data, isPending, isError, error } = useMutation<
    any,
    any,
    { postid: string }
  >({
    mutationFn: (values: { postid: string }) =>
      mutatormgt({
        method: "POST",
        data: values,
        url: endpoints.posts.singlepost,
      }),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: queryKeys.user.root });
    },
  });

  return useMemo(
    () => ({
      singlePost: mutateAsync,
      data,
      isFetchingSinglePost: isPending,
      error,
      isError,
    }),
    [mutateAsync, data, isPending, error, isError]
  );
}

export function useGetSinglePost(postid: string) {
  const { data, isLoading, error, isError, refetch } = useQuery<any>({
    queryKey: [queryKeys.posts.SinglePost, postid],
    queryFn: () =>
      fetchermgt(`/posts/${postid}`, {
        method: "GET",
        data: { postid },
      }),
    enabled: !!postid,
  });

  return useMemo(
    () => ({
      singlePost: data,
      refetchSinglePost: refetch,
      isFetchingSinglePost: isLoading,
      error,
      isError,
    }),
    [data, refetch, isLoading, error, isError]
  );
}

//   export function useGetSinglePost(option?: { postid: string }) {
//   console.log(option, "search")
//   const { data, isLoading, refetch, isRefetching, error, isError } = useQuery({
//     queryKey: [queryKeys.friends.friendsearch, option?.postid],
//     queryFn: () => fetchermgt(endpoints.posts.singlepost, { method: "POST", data: { search: option?.postid } }),
//     enabled: !!option?.postid,
//   });

//   return useMemo(
//     () => ({
//       singlePost: data,
//       postRefetch: refetch,
//       isfetchingpost: isLoading,
//       isRefetching,
//       error,
//       isError,
//     }),
//     [data, isLoading, refetch, isRefetching, error, isError]
//   );
// }

export function useLikePost() {
  // const {loggedInUser}= useAuth()
  const queryClient = useQueryClient();
  const { mutateAsync, data, isPending, isError, error } = useMutation<
    any,
    any,
    { postid: string }
  >({
    mutationFn: (values: { postid: string }) =>
      mutatormgt({ method: "POST", data: values, url: endpoints.posts.like }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.posts });
    },
  });

  return useMemo(
    () => ({
      likePost: mutateAsync,
      data,
      isLikingPost: isPending,
      error,
      isError,
    }),
    [mutateAsync, data, isPending, error, isError]
  );
}

export function useDisLikePost() {
  // const {loggedInUser}= useAuth()
  const queryClient = useQueryClient();
  const { mutateAsync, data, isPending, isError, error } = useMutation<
    any,
    any,
    { postid: string }
  >({
    mutationFn: (values: { postid: string }) =>
      mutatormgt({
        method: "DELETE",
        data: values,
        url: endpoints.posts.dislike,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.posts });
    },
  });

  return useMemo(
    () => ({
      disLikePost: mutateAsync,
      data,
      isdisLikingPost: isPending,
      error,
      isError,
    }),
    [mutateAsync, data, isPending, error, isError]
  );
}
