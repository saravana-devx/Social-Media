import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import RightSideBar from "@/components/layout/RightSideBar";
import LeftSidebar from "@/components/layout/LeftSideBar";
import { Outlet } from "react-router-dom";
import CreatePostModal from "@/components/post/CreatePostModal";

const MainLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Dynamic width based on sidebar collapsed state
  // const sidebarWidth = isSidebarCollapsed ? "lg:ml-20" : "lg:ml-56";

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block">
        <LeftSidebar onCollapse={(v: boolean) => setIsSidebarCollapsed(v)} />
      </div>

      <div
        className={`flex flex-col flex-1 transition-all duration-300 `}
      >
        <Navbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

        <CreatePostModal />
        <LeftSidebar
          isMobile
          mobileMenuOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 w-full mx-auto px-2 md:px-4">
          <Outlet />
        </main>
      </div>

      <div className="hidden xl:block">
        <RightSideBar />
      </div>
    </div>
  );
};

export default MainLayout;
