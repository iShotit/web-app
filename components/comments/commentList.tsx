"use client";
import { useGetSinglePostComments, useCreateComment } from "@/app/api/comments";
import React, { useState, useEffect } from "react";
import { useCommentsStore } from "@/store/comments";
import { type IComment } from "@/types/type";

const CommentList = ({ postid }: { postid: string }) => {
  const [newComment, setNewComment] = useState("");
  const { setComments, comments, addComment, clearComments } =
    useCommentsStore();

  const { fetchComments, isFetchingComments } = useGetSinglePostComments();
  const { createComment, isCreatingComment, errorCreateComment } =
    useCreateComment();

  useEffect(() => {
    const getComments = async () => {
      try {
        clearComments();
        const response = await fetchComments({ postid });
        setComments(response.data ?? []);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    getComments();
  }, [postid, fetchComments, setComments, clearComments]);

  const handleCommentSubmit = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && newComment.trim()) {
      e.preventDefault();
      try {
        const newCreatedComment = await createComment({
          comment: newComment,
          postid,
        });
        setNewComment("");
        addComment(newCreatedComment);
      } catch (err) {
        console.error("Error creating comment:", err);
      }
    }
  };

  return (
    <div className="mt-8 mb-20">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>

      {isFetchingComments ? (
        <div className="text-center text-gray-500">Loading comments...</div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment: IComment) => (
            <div key={comment._id} className="border-b pb-2">
              <div className="text-sm font-semibold">
                {comment.userInfo.username}:
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <input
          type="text"
          className="w-full border rounded-full p-3 text-sm"
          placeholder="Add Comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleCommentSubmit}
        />
        {isCreatingComment && (
          <div className="text-sm text-gray-500 mt-2">
            Submitting comment...
          </div>
        )}
        {errorCreateComment && (
          <div className="text-sm text-red-500 mt-2">
            Error submitting comment
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentList;
