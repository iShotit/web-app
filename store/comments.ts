import { IComment } from "@/types/type";
import { create } from "zustand";

interface CommentsStore {
  comments: IComment[];
  setComments: (comments: IComment[]) => void;
  addComment: (comment: IComment) => void;
  clearComments: () => void;
}

export const useCommentsStore = create<CommentsStore>((set) => ({
  comments: [],
  setComments: (comments) => set({ comments }),
  addComment: (comment) =>
    set((state) => ({ comments: [comment, ...state.comments] })),
  clearComments: () => set({ comments: [] }),
}));
