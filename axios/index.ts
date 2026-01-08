// import { removeAuthCookie } from "@/lib/auth";
import { clearStorage, getItem } from "@/lib/localStorage";
import axios, { AxiosRequestConfig } from "axios";

export enum ApiType {
  USERMGT = "USERMGT",
  NEWSMGT = "NEWSMGT",
}
export function getCookie(name: string): string | null {
  // Ensure this runs only in browser environment
  if (typeof window === "undefined") {
    return null;
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

const createAxiosInstance = (baseUrlKey: ApiType) => {
  // Mapping of API types to their respective base URLs
  const baseUrls = {
    [ApiType.USERMGT]: process.env.NEXT_PUBLIC_API_URL_USERMGT,
    [ApiType.NEWSMGT]: process.env.NEXT_PUBLIC_API_URL_NEWSMGT,
  };
  const axiosInstance = axios.create({
    baseURL: baseUrls[baseUrlKey],
    // Add timeout to prevent hanging requests
    // timeout: 20000,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = getItem("auth_token");

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for global error handling

  axiosInstance.interceptors.response.use(
    (response) => response, // Return the response if there's no error
    (error) => {
      console.error("API Error:", error);
      const publicPaths = [
        "/auth/sign-in",
        "/auth/sign-up",
        "/privacy",
        "/about",
      ];
      const path = window.location.pathname;
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        switch (error.response.status) {
          case 404:
            // Redirect to login page for 404 errors
            if (!publicPaths.includes(path)) {
              if (typeof window !== "undefined") {
                clearStorage();
                window.location.href = "/auth/sign-in";
              }
            }
            break;
          case 401:
            // Unauthorized: Redirect to login page
            if (!publicPaths.includes(path)) {
              if (typeof window !== "undefined") {
                clearStorage();
                window.location.href = "/auth/sign-in";
              }
            }
            break;
          // Add more cases for other status codes as needed
          default:
            // Handle other errors
            break;
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const usermgtApi = createAxiosInstance(ApiType.USERMGT);
export const newsmgtApi = createAxiosInstance(ApiType.NEWSMGT);

// Generic fetcher with improved type safety
export const fetcher = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  console.log(config, "config");
  try {
    const res = await usermgtApi.get(url, { ...config });
    return res.data.data;
  } catch (error) {
    // Add error handling
    console.error("Fetcher error:", error);
    throw error;
  }
};

export const fetchermgt = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = await newsmgtApi.get(url, { ...config });
    return res.data.data;
  } catch (error) {
    console.error("Fetchermgt error:", error);
    throw error;
  }
};

export const mutator = async <Data>(
  request: AxiosRequestConfig
): Promise<Data> => {
  try {
    const res = await usermgtApi(request);
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data || e;
    }
    throw e;
  }
};

export const mutatormgt = async <Data>(
  request: AxiosRequestConfig
): Promise<Data> => {
  console.log(request, "request");
  try {
    const res = await newsmgtApi(request);
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data || e;
    }
    throw e;
  }
};

export const endpoints = {
  auth: {
    login: "/user/login",
    register: "/user/signup",
    resentToken: "auth/resend-token",
    resentTokenForgetPassword: "/auth/resend-password-reset-token",
    verify: "/auth/activate-account",
    forgetPassword: "/auth/forgot-password",
    verifyForgetPassword: "/auth/verify-password-reset-token",
    resetPassword: "/auth/reset-password",
    verifyEmail: (token: string) => `/v1/user/verify-email/${token}`,
  },
  user: {
    profile: "/user",
    notification: "/notification",
    editProfile: (id: string) => `/user/update/${id}`,
    avatarUpload: "/user/settings/avatar",
  },
  friends: {
    friendslist: "/friends/list",
    friendsearch: "/friends/search",
    friendrequest: "/friends/sendrequest",
    friendrequestlist: "/friends/myfriend/request",
    incomingRequests: "/friends/incoming/request",
    friendrequestaccept: "/friends/accept/request",
    friendrequestdecline: "/friends/decline/request",
    friendrequestunfriend: "/friends/unfriend",
  },
  posts: {
    posts: "/posts",
    singlepost: "/post/view",
    like: "/like/create",
    dislike: "/like/remove",
    share: "/",
    create: "/post/create",
  },
  comments: {
    create: "/comment/create",
    comment: "/comments",
  },
};
