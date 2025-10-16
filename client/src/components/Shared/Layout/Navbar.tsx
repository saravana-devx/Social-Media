import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "./SideBar";
import { useOnClickOutside } from 'usehooks-ts'
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import image from "@/assets/Dummy/Images/e1532520016e4f8d4b5f0fa770008724.jpeg"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Button } from "../../ui/button";
import { Settings } from "lucide-react";
import { CgSupport } from "react-icons/cg";

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const sideBarRef = useRef<HTMLDivElement>(null!)

  const handleClickOutside = () => {
    setIsSidebarOpen(false);
  }
  useOnClickOutside(sideBarRef, handleClickOutside)
  return (
    <div className="w-full py-2 md:py-4 px-6 shadow-md select-none ">
      <div className="flex items-center justify-between">
        <RxHamburgerMenu
          className="w-8 h-8 text-indigo-600 cursor-pointer"
          onClick={toggleSidebar}
        />
        {
          !isSidebarOpen && (
            <Link
              to="/"
              className="text-3xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
            >
              Social Media
            </Link>
          )
        }

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="w-10 h-10 cursor-pointer ring-2 ring-gray-200  hover:ring-indigo-400 transition-all">
              <AvatarImage className="object-cover" src={image} />
              <AvatarFallback>LF</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-64 p-3 rounded-2xl shadow-xl bg-white/90 backdrop-blur-md border border-gray-100"
            align="end"
          >
            <DropdownMenuGroup className="flex flex-row items-center text-center space-y-2 py-2">
              <Avatar className="w-14 h-14">
                <AvatarImage className="object-cover" src={image} />
                <AvatarFallback>LF</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-start items-center ml-4">
                <div>
                  <p className="font-semibold text-gray-800">Lori Ferguson</p>
                  <p className="text-sm text-gray-500">Web Developer</p>
                </div>
                <Button
                  size="sm"
                  className="mt-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 py-1"
                  onClick={() => {
                    navigate("/profile")
                  }}
                >
                  Profile
                </Button>
              </div>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuLabel className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <Settings className="w-4 h-4" />
              <Link
                to="/setting"
              >
                Settings & Privacy
              </Link>
            </DropdownMenuLabel>

            <DropdownMenuItem className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 rounded-lg px-2 py-2 transition-all">
              <CgSupport className="w-4 h-4" />
              <Link
                to="/support"
              >Support</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuItem className="text-red-600 font-medium hover:bg-red-50 rounded-lg px-2 py-2 transition-all">
              <Button
                size="sm"
                className="mt-1 bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-1"
              >
                Sign Out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
      <Sidebar
        isOpen={isSidebarOpen}
        sideBarRef={sideBarRef}
      />
    </div>
  );
};

export default Navbar;
