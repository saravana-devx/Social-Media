import React, { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/SideBar";

const MainLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sideBarRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} sideBarRef={sideBarRef} />
      <div className="flex flex-col flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 bg-background">
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default MainLayout;
