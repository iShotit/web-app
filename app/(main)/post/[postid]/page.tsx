"use client";
import { useGetSinglePost } from "@/app/api/posts";
import CommentList from "@/components/comments/commentList";
import PostCard from "@/components/PostCard/PostCard";
import { ChevronsLeft } from "lucide-react";

const SinglePost = ({ params }: { params: { postid: string } }) => {
  const { singlePost, isFetchingSinglePost, error } = useGetSinglePost(
    params.postid
  );

  return (
    <div className="mx-4">
      <button
        className="flex items-center mt-4 ml-4"
        onClick={() => window.history.back()}
      >
        <ChevronsLeft className="mr-1" /> Back
      </button>
      {isFetchingSinglePost && <p>Loading...</p>}
      {error && <p>Error loading post.</p>}
      {singlePost && <PostCard post={singlePost} />}
      {singlePost && <CommentList postid={params.postid} />}
    </div>
  );
};

export default SinglePost;
