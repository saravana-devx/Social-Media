import { useState } from "react";

export interface CommentReply {
  image: string;
  name: string;
  description: string;
  posted: string;
}

export interface CommentItem {
  image: string;
  name: string;
  description: string;
  posted: string;
  commentedOnComment: CommentReply[];
}

export const useComments = () => {
  const [comments, setComments] = useState<CommentItem[]>([
    // ⚠️ Mock data moved from UI file
    {
      image: "/dummy/img1.png",
      name: "Frances Guerrero",
      description: "...",
      posted: "5hr",
      commentedOnComment: [...],
    },
    ...
  ]);

  const [newComment, setNewComment] = useState("");

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    setComments([
      {
        image: "/dummy/newUser.jpg",
        name: "You",
        description: newComment,
        posted: "Just now",
        commentedOnComment: [],
      },
      ...comments,
    ]);
    setNewComment("");
  };

  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  return {
    comments,
    newComment,
    setNewComment,
    handlePostComment,
    autoGrow,
  };
};
