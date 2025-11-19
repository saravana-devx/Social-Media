import CreatePost from "@/components/post/CreatePost";
import About from "../components/About";
import ProfileHeader from "../components/ProfileHeader";
import SavedMedia from "../components/SavedMedia";

const ProfilePage = () => {
  return (
    <div className="w-full bg-background min-h-screen p-4 flex justify-center">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[70%]">
            <ProfileHeader />
          </div>

          <div className="w-full lg:w-[30%] space-y-4">
            <About />
            <CreatePost />
            <SavedMedia />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
