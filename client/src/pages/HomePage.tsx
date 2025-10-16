import CreatePost from "@/components/Shared/Post/CreatePost";
import Navbar from "@/components/Shared/Layout/Navbar";
import SinglePost from "@/components/Shared/Post/SinglePost";
import StoryViewer from "@/components/Home/StoryStrip";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="px-2 sm:px-0">
      <Navbar />
      <StoryViewer />
      <CreatePost />
      <SinglePost />
      <SinglePost />
      <SinglePost />
      <SinglePost />
      <SinglePost />
      <SinglePost />
      <SinglePost />
      <SinglePost />
    </div>
  );
};

export default HomePage;
