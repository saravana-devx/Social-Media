// import React, { useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Calendar,
//   Home,
//   Users,
//   Bell,
//   Settings,
//   Newspaper,
//   Video,
//   MessageSquare,
//   Image,
//   PartyPopper,
// } from "lucide-react";

// const items = [
//   { title: "Feed", url: "/home", icon: Home },
//   { title: "Connections", url: "/connections", icon: Users },
//   { title: "Latest News", url: "/news", icon: Newspaper },
//   { title: "Events", url: "/events", icon: Calendar },
//   { title: "Groups", url: "/groups", icon: Users },
//   { title: "Notifications", url: "/notifications", icon: Bell },
//   { title: "Settings", url: "/settings", icon: Settings },
//   { title: "Photos", url: "/photos", icon: Image },
//   { title: "Celebrations", url: "/celebrations", icon: PartyPopper },
//   { title: "Video", url: "/videos", icon: Video },
//   { title: "Messaging", url: "/messaging", icon: MessageSquare },
// ];

// const LeftSidebar: React.FC = ({

// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const sideBarRef = useRef<HTMLDivElement | null>(null);
//   return (
//     <div
//       ref={sideBarRef}
//       className={`fixed top-0 left-0 h-screen bg-white border-r shadow-xl z-50
//       transition-all duration-300 ease-in-out flex flex-col
//       ${isOpen ? "w-20" : "w-56"}`}
//     >
//       {/* Toggle Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="absolute top-4 left-4 p-2 rounded-full border bg-white shadow hover:bg-gray-50"
//       >
//         {isOpen ? (
//           <span className="text-lg">›</span>
//         ) : (
//           <span className="text-lg">‹</span>
//         )}
//       </button>

//       {/* OPEN STATE → icons only */}
//       {isOpen && (
//         <div className="mt-16 flex flex-col items-center gap-6 w-full px-2">
//           {items.map((item, index) => {
//             const Icon = item.icon;
//             return (
//               <Link
//                 key={index}
//                 to={item.url}
//                 className="flex items-center justify-center w-full p-2 rounded-lg hover:bg-gray-100 transition"
//               >
//                 <Icon className="h-6 w-6 text-gray-700" />
//               </Link>
//             );
//           })}
//         </div>
//       )}

//       {/* CLOSED STATE → icons + labels */}
//       {!isOpen && (
//         <div className="mt-16 p-4">
//           {/* <h2 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6">
//             Social Media
//           </h2> */}

//           <ul className="space-y-2">
//             {items.map((item, index) => {
//               const Icon = item.icon;
//               return (
//                 <li key={index}>
//                   <Link
//                     to={item.url}
//                     className="flex items-center gap-3 p-2 text-foreground hover:bg-accent rounded-lg transition"
//                   >
//                     <Icon className="w-5 h-5" />
//                     <span className="font-semibold">{item.title}</span>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeftSidebar;

// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Calendar,
//   Home,
//   Users,
//   Bell,
//   Settings,
//   Newspaper,
//   Video,
//   MessageSquare,
//   Image,
//   PartyPopper,
//   ChevronLeft,
//   ChevronRight,
//   X,
// } from "lucide-react";
// import { Sheet, SheetContent } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";

// const items = [
//   { title: "Feed", url: "/feed", icon: Home },
//   { title: "Connections", url: "/connectionList", icon: Users },
//   { title: "Latest News", url: "/news", icon: Newspaper },
//   { title: "Groups", url: "/groups", icon: Users },
//   { title: "Notifications", url: "/notifications", icon: Bell },
//   { title: "Profile", url: "/profile", icon: Settings },
//   { title: "Photos", url: "/photos", icon: Image },
//   { title: "Celebrations", url: "/postmodal", icon: PartyPopper },
//   { title: "Video", url: "/videos", icon: Video },
//   { title: "Chat", url: "/chat", icon: MessageSquare },
// ];

// interface LeftSidebarProps {
//   isMobile?: boolean;
//   mobileMenuOpen?: boolean;
//   onClose?: () => void;
// }

// const LeftSidebar: React.FC<LeftSidebarProps> = ({
//   isMobile,
//   mobileMenuOpen,
//   onClose,
// }) => {
//   const [isCollapsed, setIsCollapsed] = React.useState(false);
//   const location = useLocation();

//   const SidebarContent = () => (
//     <>
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => setIsCollapsed(!isCollapsed)}
//         className="absolute top-4 right-4 rounded-full border border-border bg-background shadow-md hover:bg-accent transition-colors"
//       >
//         {isCollapsed ? (
//           <ChevronRight className="h-4 w-4 text-foreground" />
//         ) : (
//           <ChevronLeft className="h-4 w-4 text-foreground" />
//         )}
//       </Button>

//       {isCollapsed ? (
//         <div className="mt-16 flex flex-col items-center gap-4 w-full px-2">
//           {items.map((item, index) => {
//             const Icon = item.icon;
//             const isActive = location.pathname === item.url;
//             return (
//               <Link
//                 key={index}
//                 to={item.url}
//                 onClick={isMobile ? onClose : undefined}
//                 className={`flex items-center justify-center w-full p-3 rounded-xl transition-all duration-200 ${
//                   isActive
//                     ? "bg-primary text-primary-foreground shadow-md"
//                     : "hover:bg-accent text-muted-foreground hover:text-foreground"
//                 }`}
//               >
//                 <Icon className="h-5 w-5" />
//               </Link>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="mt-16 p-4">
//           <ul className="space-y-1">
//             {items.map((item, index) => {
//               const Icon = item.icon;
//               const isActive = location.pathname === item.url;
//               return (
//                 <li key={index}>
//                   <Link
//                     to={item.url}
//                     onClick={isMobile ? onClose : undefined}
//                     className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 font-medium ${
//                       isActive
//                         ? "bg-primary text-primary-foreground shadow-md"
//                         : "text-foreground hover:bg-accent"
//                     }`}
//                   >
//                     <Icon className="w-5 h-5" />
//                     <span>{item.title}</span>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}
//     </>
//   );

//   // Mobile: render as Sheet
//   if (isMobile) {
//     return (
//       <Sheet open={mobileMenuOpen} onOpenChange={onClose}>
//         <SheetContent side="left" className="w-72 p-0 bg-card border-border">
//           <div className="relative h-full flex flex-col">
//             <SidebarContent />
//           </div>
//         </SheetContent>
//       </Sheet>
//     );
//   }

//   // Desktop: render as fixed sidebar
//   return (
//     <div
//       className={`fixed top-[76px] left-0 h-screen bg-card border-r border-border shadow-xl z-50
//       transition-all duration-300 ease-in-out flex flex-col
//       ${isCollapsed ? "w-20" : "w-56"}`}
//     >
//       <SidebarContent />
//     </div>
//   );
// };

// export default LeftSidebar;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  Home,
  Users,
  Bell,
  Settings,
  Newspaper,
  Video,
  MessageSquare,
  Image,
  PartyPopper,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const items = [
  { title: "Feed", url: "/feed", icon: Home },
  { title: "Connections", url: "/connectionList", icon: Users },
  { title: "Latest News", url: "/news", icon: Newspaper },
  { title: "Groups", url: "/groups", icon: Users },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Profile", url: "/profile", icon: Settings },
  { title: "Photos", url: "/photos", icon: Image },
  { title: "Celebrations", url: "/postmodal", icon: PartyPopper },
  { title: "Video", url: "/videos", icon: Video },
  { title: "Chat", url: "/chat", icon: MessageSquare },
];

interface LeftSidebarProps {
  isMobile?: boolean;
  mobileMenuOpen?: boolean;
  onClose?: () => void;
  onCollapse?: (v: boolean) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  isMobile,
  mobileMenuOpen,
  onClose,
  onCollapse,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const location = useLocation();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onCollapse?.(!isCollapsed);
  };

  const SidebarContent = () => (
    <>
      {/* ✅ COLLAPSE BUTTON */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleCollapse}
        className="absolute top-4 right-3 rounded-full border bg-background shadow-md hover:bg-accent"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      {/* ✅ COLLAPSED MODE */}
      {isCollapsed ? (
        <div className="mt-16 flex flex-col items-center gap-4 px-2">
          {items.map((item, idx) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.url;
            return (
              <Link
                key={idx}
                to={item.url}
                className={`w-full flex justify-center p-3 rounded-xl transition ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-accent text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
              </Link>
            );
          })}
        </div>
      ) : (
        /* ✅ EXPANDED MODE */
        <div className="mt-16 p-4">
          <ul className="space-y-1">
            {items.map((item, idx) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.url;
              return (
                <li key={idx}>
                  <Link
                    to={item.url}
                    className={`flex items-center gap-3 p-3 rounded-xl transition font-medium ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );

  // ✅ MOBILE VERSION (Sheet)
  if (isMobile) {
    return (
      <Sheet open={mobileMenuOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-72 p-0 bg-card">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  // ✅ DESKTOP VERSION
  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-card border-r border-border shadow-xl 
      transition-all duration-300 z-50 
      ${isCollapsed ? "w-20" : "w-56"}`}
    >
      <SidebarContent />
    </div>
  );
};

export default LeftSidebar;
