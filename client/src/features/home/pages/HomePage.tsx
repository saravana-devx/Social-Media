import { CreatePost, PostLayout } from "@/components/post";
import StoryBar from "../components/StoryBar";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-2 sm:px-0">
        <StoryBar />
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
