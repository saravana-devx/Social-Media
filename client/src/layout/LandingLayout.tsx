import { Outlet } from "react-router-dom";
import Footer from "@/components/layout/Footer";

const LandingLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
