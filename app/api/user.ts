// import { getAuthToken } from "@/utils";
import {
  // useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo } from "react";
// import { endpoints, fetcher, mutator } from "../axios";
import { IUpdateUser, IUser } from "@/types/type";
import { endpoints, fetcher, mutator } from "@/axios";
import { queryKeys } from "@/React-Query";
import { useAuth } from "@/context/AuthContext";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useGetUser(option?: { enabled: boolean }) {
  // console.log(option, "option");
  //   const accessToken = getAuthToken();
  const { data, isLoading, refetch, isRefetching, error, isError } =
    useQuery<IUser>({
      queryKey: queryKeys.user.root,
      queryFn: () => fetcher(endpoints.user.profile),
      // enabled: option?.enabled || !!accessToken,
    });

  return useMemo(
    () => ({
      profileData: data,
      profileRefetch: refetch,
      profileLoading: isLoading,
      isRefetching,
      error,
      isError,
    }),
    [data, isLoading, refetch, isRefetching, error, isError]
  );
}

export function useUpdateProfile() {
  const { loggedInUser } = useAuth();
  console.log(loggedInUser, "looginuser");
  const queryClient = useQueryClient();
  const { mutateAsync, data, isPending, isError, error } = useMutation<
    IUser,
    any,
    IUpdateUser
  >({
    mutationFn: (values: IUpdateUser) =>
      mutator({
        method: "PUT",
        data: values,
        url: endpoints.user.editProfile(loggedInUser?._id as string),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.root });
    },
  });

  return useMemo(
    () => ({
      updateprofile: mutateAsync,
      data,
      isProfileUpdating: isPending,
      error,
      isError,
    }),
    [mutateAsync, data, isPending, error, isError]
  );
}
