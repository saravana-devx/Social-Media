import React from "react";
import { PostLayout } from "@/layout";
import { StoriesBar } from "@/features/home";
import CreatePost from "@/components/post/CreatePost";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-2 sm:px-0">
        <StoriesBar />
        <CreatePost />
        <PostLayout />
        <PostLayout />
        <PostLayout />
        <PostLayout />
      </div>
    </div>
  );
};

export default HomePage;