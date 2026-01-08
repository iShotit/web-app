"use client";

import { useState } from "react";
import { avatar } from "@/lib/constant";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";
import { useCreatePost } from "@/app/api/posts";

function NewPost() {
  const [postText, setPostText] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const { createPost, isCreatingPost, error } = useCreatePost();

  const maxCharCount = 250;
  const remainingChars = maxCharCount - postText.length;
  const isOverLimit = remainingChars < 0;

  const handlePostSubmit = () => {
    if (!postText.trim() || isOverLimit || isCreatingPost) return;

    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;

        createPost(
          {
            post: postText.trim(),
            longitude: longitude.toString(),
            latitude: latitude.toString(),
            isPrivate,
          },
          {
            onSuccess: () => {
              setPostText("");
              setIsPrivate(false);
            },
            onError: (error) => {
              console.error("Failed to submit post:", error);
            },
          }
        );
      },
      (err) => {
        setLocationError("Unable to retrieve your location.");
        console.error("Geolocation error:", err);
      }
    );
  };

  return (
    <div className="max-w-xl mx-auto p-4 border-b bg-white shadow-sm rounded-lg">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
          <Image
            src={avatar}
            alt="Profile"
            width={40}
            height={40}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <div className="flex-1">
          <TextareaAutosize
            placeholder="What is happening?!"
            className="w-full outline-none border-none resize-none text-lg p-0 focus:outline-none min-h-[80px]"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            maxLength={maxCharCount}
            aria-label="New post content"
          />

          <div className="flex justify-between items-center mt-3">
            <span
              className={`text-sm ${
                isOverLimit ? "text-red-500" : "text-gray-500"
              }`}
            >
              {remainingChars}
            </span>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isPrivate
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-400 bg-white"
                  }`}
                >
                  {isPrivate && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </button>
                <span
                  className="text-sm text-gray-600 cursor-pointer"
                  onClick={() => setIsPrivate(!isPrivate)}
                >
                  Private
                </span>
              </div>

              <button
                className={`rounded-full px-4 py-2 text-white font-medium transition-colors ${
                  postText.trim() && !isOverLimit
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-blue-300 cursor-not-allowed"
                }`}
                disabled={!postText.trim() || isOverLimit || isCreatingPost}
                onClick={handlePostSubmit}
              >
                {isCreatingPost ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
      {locationError && (
        <p className="text-red-500 text-sm mt-2">{locationError}</p>
      )}
    </div>
  );
}

export default NewPost;
