// import React, { useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Menu, User, Settings, HelpCircle, LogOut, Crown } from "lucide-react";
// import image from "@/assets/Dummy/Images/e1532520016e4f8d4b5f0fa770008724.jpeg"
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
// import { Button } from "../ui/button";

// import { useOnClickOutside } from 'usehooks-ts'
// import Sidebar from "./SideBar";

// const Navbar: React.FC = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
//   const sideBarRef = useRef<HTMLDivElement>(null!)

//   const handleClickOutside = () => {
//     console.log("sidebar value : ", isSidebarOpen)
//     setIsSidebarOpen(false);
//   }
//   useOnClickOutside(sideBarRef, handleClickOutside)

//   return (
//     <div className="w-full py-3 md:py-4 px-6 border-b border-border select-none bg-card/50 backdrop-blur-md sticky top-0 z-40">
//       <div className="flex items-center justify-between max-w-7xl mx-auto">
//         {!isSidebarOpen && (
//         <button
//           onClick={toggleSidebar}
//           className="p-2 rounded-xl hover:bg-accent/50 transition-colors group"
//         >
//           <Menu className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
//         </button>
//         )}

//         {isSidebarOpen && (
//           <button className="none"></button>
//         )}

//         {!isSidebarOpen && (
//           <Link
//             to="/"
//             className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
//           >
//             Social Media
//           </Link>
//         )}

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button className="relative group">
//               <Avatar className="w-11 h-11 cursor-pointer ring-2 ring-border hover:ring-primary transition-all duration-300 group-hover:scale-105">
//                 <AvatarImage className="object-cover" src={image} />
//                 <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">LF</AvatarFallback>
//               </Avatar>
//               <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-card"></div>
//             </button>
//           </DropdownMenuTrigger>

//           <DropdownMenuContent
//             className="w-80 p-4 rounded-2xl shadow-2xl bg-card/95 backdrop-blur-xl border-2 border-border z-50"
//             align="end"
//           >
//             <DropdownMenuGroup className="flex items-center gap-4 p-3 mb-3 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl">
//               <Avatar className="w-16 h-16 ring-4 ring-primary/20">
//                 <AvatarImage className="object-cover" src={image} />
//                 <AvatarFallback>LF</AvatarFallback>
//               </Avatar>
//               <div className="flex-1">
//                 <div className="flex items-center gap-2 mb-1">
//                   <p className="font-bold text-foreground">Lori Ferguson</p>
//                   <Crown className="w-4 h-4 text-yellow-500" />
//                 </div>
//                 <p className="text-sm text-muted-foreground mb-2">Web Developer</p>
//                 <Button
//                   size="sm"
//                   className="w-full rounded-lg shadow-md hover:shadow-lg transition-all"
//                   onClick={() => navigate("/profile")}
//                 >
//                   <User className="w-4 h-4 mr-2" />
//                   View Profile
//                 </Button>
//               </div>
//             </DropdownMenuGroup>

//             <DropdownMenuSeparator className="my-3" />

//             <DropdownMenuLabel className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
//               Account
//             </DropdownMenuLabel>

//             <DropdownMenuItem
//               className="flex items-center gap-3 text-foreground hover:bg-accent/50 rounded-xl px-3 py-3 transition-all cursor-pointer group"
//               onClick={() => navigate("/setting")}
//             >
//               <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
//                 <Settings className="w-4 h-4 text-primary" />
//               </div>
//               <div className="flex-1">
//                 <p className="font-medium">Settings & Privacy</p>
//                 <p className="text-xs text-muted-foreground">Manage your account</p>
//               </div>
//             </DropdownMenuItem>

//             <DropdownMenuItem
//               className="flex items-center gap-3 text-foreground hover:bg-accent/50 rounded-xl px-3 py-3 transition-all cursor-pointer group"
//               onClick={() => navigate("/support")}
//             >
//               <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
//                 <HelpCircle className="w-4 h-4 text-accent" />
//               </div>
//               <div className="flex-1">
//                 <p className="font-medium">Help & Support</p>
//                 <p className="text-xs text-muted-foreground">Get assistance</p>
//               </div>
//             </DropdownMenuItem>

//             <DropdownMenuSeparator className="my-3" />

//             <DropdownMenuItem
//               className="flex items-center gap-3 hover:bg-destructive/10 rounded-xl px-3 py-3 transition-all cursor-pointer group"
//             >
//               <div className="p-2 rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
//                 <LogOut className="w-4 h-4 text-destructive" />
//               </div>
//               <p className="font-medium text-destructive">Sign Out</p>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       <Sidebar
//         isOpen={isSidebarOpen}
//         sideBarRef={sideBarRef}
//       />
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, Settings, HelpCircle, LogOut, Crown } from "lucide-react";
import image from "@/assets/Dummy/Images/e1532520016e4f8d4b5f0fa770008724.jpeg";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full py-3 md:py-4 px-6 border-b border-border select-none bg-card/50 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* ✅ Sidebar toggle button */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl hover:bg-accent/50 transition-colors group"
        >
          <Menu className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
        </button>

        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          Social Media
        </Link>

        {/* ✅ Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative group">
              <Avatar className="w-11 h-11 cursor-pointer ring-2 ring-border hover:ring-primary transition-all duration-300 group-hover:scale-105">
                <AvatarImage className="object-cover" src={image} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
                  LF
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-card"></div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-80 p-4 rounded-2xl shadow-2xl bg-card/95 backdrop-blur-xl border-2 border-border z-50"
            align="end"
          >
            <DropdownMenuGroup className="flex items-center gap-4 p-3 mb-3 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl">
              <Avatar className="w-16 h-16 ring-4 ring-primary/20">
                <AvatarImage className="object-cover" src={image} />
                <AvatarFallback>LF</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-foreground">Lori Ferguson</p>
                  <Crown className="w-4 h-4 text-yellow-500" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Web Developer
                </p>
                <Button
                  size="sm"
                  className="w-full rounded-lg shadow-md hover:shadow-lg transition-all"
                  onClick={() => navigate("/profile")}
                >
                  <User className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </div>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-3" />
            <DropdownMenuLabel className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Account
            </DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => navigate("/settings")}
              className="flex items-center gap-3 text-foreground hover:bg-accent/50 rounded-xl px-3 py-3 transition-all cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Settings className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Settings & Privacy</p>
                <p className="text-xs text-muted-foreground">
                  Manage your account
                </p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate("/support")}
              className="flex items-center gap-3 text-foreground hover:bg-accent/50 rounded-xl px-3 py-3 transition-all cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <HelpCircle className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Help & Support</p>
                <p className="text-xs text-muted-foreground">Get assistance</p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-3" />

            <DropdownMenuItem className="flex items-center gap-3 hover:bg-destructive/10 rounded-xl px-3 py-3 transition-all cursor-pointer group">
              <div className="p-2 rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
                <LogOut className="w-4 h-4 text-destructive" />
              </div>
              <p className="font-medium text-destructive">Sign Out</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
