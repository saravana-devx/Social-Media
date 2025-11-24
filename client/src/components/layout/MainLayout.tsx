import { useState } from "react";

import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import Navbar from "./Navbar/Navbar";
import RightSideBar from "./RightSideBar/RightSidebar";
import PostEditorModal from "@/features/post/modals/PostEditorModal";

const MainLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <LeftSidebar onCollapse={(v: boolean) => setIsSidebarCollapsed(v)} />
      </div>

      {/* Main Content (shifts based on collapse) */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "lg:ml-20" : "lg:ml-56"
        }`}
      >
        <Navbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

        <PostEditorModal />

        {/* Mobile Sidebar */}
        <LeftSidebar
          isMobile
          mobileMenuOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 w-full mx-auto px-2 md:px-4">
          <Outlet />
        </main>
      </div>

      {/* Desktop Right Sidebar */}
      <div className="hidden xl:block">
        <RightSideBar />
      </div>
    </div>
  );
};

export default MainLayout;
