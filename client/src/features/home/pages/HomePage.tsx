import React from "react";
import { PostLayout } from "@/layout";
// import { Navbar } from "@/components/layout";
import { StoriesBar, CreatePost } from "@/features/home";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}
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