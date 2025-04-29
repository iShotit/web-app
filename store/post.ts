import { create } from "zustand";
import { IPosts, Post } from "@/types/type";

interface PostState {
  posts: IPosts;
  addPost: (post: Post) => void;
  setPosts: (posts: IPosts) => void;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  setPosts: (posts) => set({ posts }),
}));
