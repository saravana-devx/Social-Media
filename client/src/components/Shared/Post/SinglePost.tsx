import React from "react";
import image from "@/assets/Dummy/Images/e1532520016e4f8d4b5f0fa770008724.jpeg";
import PersonAvatar from "../PersonAvatar";
import Comment from "../Comment/Comment";
import { ImageZoom } from "@/components/ui/shadcn-io/image-zoom";

const SinglePost: React.FC = () => {
  return (
    <div className="bg-white w-full md:w-4/5 lg:w-2/5 mx-auto mt-6 p-6 rounded-xl shadow-md flex flex-col gap-4 font-sans">
      {/* Post Header */}
      <div className="flex gap-4 items-center">
        <PersonAvatar image={image} view={false} />
        <div>
          <p className="text-gray-800 font-semibold">
            Lori Ferguson{" "}
            <span className="text-gray-500 font-normal">&middot; 2 hr ago</span>
          </p>
          <p className="text-gray-600 text-sm">Web Developer at StackBros</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="text-gray-700 text-base leading-relaxed">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde sint
          eligendi, est accusamus corporis repudiandae nemo vero accusantium
          dignissimos aliquam quae corrupti delectus nihil velit beatae dolorem
          inventore numquam aperiam.
          <span className="text-blue-500 cursor-pointer hover:underline">
            {" "}
            ...Read More
          </span>
        </p>
      </div>

      {/* Post Image */}
      <div className="w-full rounded-lg overflow-hidden shadow-sm">
        <ImageZoom>
          <img
            src={image}
            alt="Post"
            className="w-full h-auto object-cover rounded-lg"
          />
        </ImageZoom>
      </div>

      {/* Post Actions */}
      <div className="border-t border-b border-gray-300 flex justify-between py-3 text-gray-600">
        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <span className="text-sm font-medium">Liked (56)</span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          <span className="text-sm font-medium">Comments (12)</span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
          <span className="text-sm font-medium">Share (3)</span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          <span className="text-sm font-medium">Send</span>
        </div>
      </div>

      <Comment />
    </div>
  );
};

export default SinglePost;
