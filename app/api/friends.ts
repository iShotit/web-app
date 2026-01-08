import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { IFriendsList, SearchResponse } from "@/types/type";
import { endpoints, fetcher, mutator } from "@/axios";
import { queryKeys } from "@/React-Query";
import { useGetUser } from "./user";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useGetFriendsList(option?: { enabled: boolean }) {
  const { data, isLoading, refetch, isRefetching, error, isError } = useQuery<
    IFriendsList | any
  >({
    queryKey: queryKeys.friends.friendsList,
    queryFn: () => fetcher(endpoints.friends.friendslist),
  });

  return useMemo(
    () => ({
      friendsList: data,
      frientsListsRefetch: refetch,
      isFetchingFriendList: isLoading,
      isRefetching,
      error,
      isError,
    }),
    [data, isLoading, refetch, isRefetching, error, isError]
  );
}

// export function useFriendsSearch1(option?: { search: string }) {
//   console.log(option, "search")
//   const { data, isLoading, refetch, isRefetching, error, isError } = useQuery({
//     queryKey: [queryKeys.friends.friendsearch, option?.search],
//     queryFn: () => fetcher(endpoints.friends.friendsearch, { method: "POST", data: { search: option?.search } }),
//     enabled: !!option?.search,
//   });

//   return useMemo(
//     () => ({
//       searchResult: data,
//       frientsListsRefetch: refetch,
//       isSearching: isLoading,
//       isRefetching,
//       error,
//       isError,
//     }),
//     [data, isLoading, refetch, isRefetching, error, isError]
//   );
// }

export function useFriendsSearch() {
  // const queryClient = useQueryClient();
  const { mutateAsync, data, isPending, isError, error } = useMutation<
    SearchResponse,
    any,
    { search: string }
  >({
    mutationFn: (values: { search: string }) =>
      mutator({
        method: "POST",
        data: values,
        url: endpoints.friends.friendsearch,
      }),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: queryKeys.user.root });
    },
  });

  return useMemo(
    () => ({
      searchFriend: mutateAsync,
      data,
      isRegistering: isPending,
      error,
      isError,
    }),
    [mutateAsync, data, isPending, error, isError]
  );
}

export function useGetIncomingFriendRequests() {
  const { data, isLoading, refetch, isRefetching, error, isError } = useQuery({
    queryKey: queryKeys.friends.incomingRequests,
    queryFn: () => fetcher(endpoints.friends.incomingRequests),
  });

  return useMemo(
    () => ({
      incomingFriendRequests: data,
      refetchIncomingRequests: refetch,
      isFetchingIncomingRequests: isLoading,
      isRefetching,
      error,
      isError,
    }),
    [data, isLoading, refetch, isRefetching, error, isError]
  );
}

export function useGetFriendsRequestList() {
  const { data, isLoading, refetch, isRefetching, error, isError } =
    useQuery<any>({
      queryKey: queryKeys.friends.friendsRequest,
      queryFn: () => fetcher(endpoints.friends.friendrequestlist),
    });

  return useMemo(
    () => ({
      friendsRequestList: data,
      frientsRequestListsRefetch: refetch,
      isFetchingFriendRequestList: isLoading,
      isRefetching,
      error,
      isError,
    }),
    [data, isLoading, refetch, isRefetching, error, isError]
  );
}
export function useAcceptFriendRequest() {
  const queryClient = useQueryClient();
  const { mutateAsync, data, isPending, isError, error } = useMutation<
    SearchResponse,
    any,
    { requestUser: string }
  >({
    mutationFn: (values: { requestUser: string }) =>
      mutator({
        method: "POST",
        data: values,
        url: endpoints.friends.friendrequestaccept,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.friends.friendsList,
      });
    },
  });

  return useMemo(
    () => ({
      acceptFriendRequest: mutateAsync,
      data,
      acceptFriendRequestIsPending: isPending,
      error,
      isError,
    }),
    [mutateAsync, data, isPending, error, isError]
  );
}

export function useDeclineFriendRequest() {
  const queryClient = useQueryClient();
  const { mutateAsync, data, isPending, isError, error } = useMutation<
    SearchResponse,
    any,
    { requestUser: string }
  >({
    mutationFn: (values: { requestUser: string }) =>
      mutator({
        method: "POST",
        data: values,
        url: endpoints.friends.friendrequestdecline,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.friends.friendsRequest,
      });
    },
  });

  return useMemo(
    () => ({
      declineFriendRequest: mutateAsync,
      data,
      declineFriendRequestIsPending: isPending,
      error,
      isError,
    }),
    [mutateAsync, data, isPending, error, isError]
  );
}

export function useUnfriendRequest() {
  const { profileData } = useGetUser();
  const queryClient = useQueryClient();
  const { mutateAsync, data, isPending, isError, error } = useMutation<
    SearchResponse,
    any,
    { requestUser: string }
  >({
    mutationFn: (values: { requestUser: string }) =>
      mutator({
        method: "DELETE",
        data: values,
        url: `${endpoints.friends.friendrequestunfriend}/${profileData?._id}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.friends.friendsList,
      });
    },
  });

  return useMemo(
    () => ({
      unfriendUser: mutateAsync,
      data,
      unfriendUserIsPending: isPending,
      error,
      isError,
    }),
    [mutateAsync, data, isPending, error, isError]
  );
}

export function useSendFriendRequest() {
  const queryClient = useQueryClient();
  const { mutateAsync, data, isPending, isError, error } = useMutation<
    SearchResponse,
    any,
    { requestUser: string }
  >({
    mutationFn: (values: { requestUser: string }) =>
      mutator({
        method: "POST",
        data: values,
        url: endpoints.friends.friendrequest,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.friends.friendsearch,
      });
    },
  });

  return useMemo(
    () => ({
      sendFriendRequest: mutateAsync,
      data,
      sendFriendRequestIsPending: isPending,
      error,
      isError,
    }),
    [mutateAsync, data, isPending, error, isError]
  );
}
