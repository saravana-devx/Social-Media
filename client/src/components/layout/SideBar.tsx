import React from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";

const items = [
  { title: "Feed", url: "/home", icon: Home },
  { title: "Connections", url: "/connections", icon: Users },
  { title: "Latest News", url: "/news", icon: Newspaper },
  { title: "Events", url: "/events", icon: Calendar },
  { title: "Groups", url: "/groups", icon: Users },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Photos", url: "/photos", icon: Image },
  { title: "Celebrations", url: "/celebrations", icon: PartyPopper },
  { title: "Video", url: "/videos", icon: Video },
  { title: "Messaging", url: "/messaging", icon: MessageSquare },
];

interface SidebarProps {
  isOpen: boolean;
  sideBarRef: React.RefObject<HTMLDivElement | null>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, sideBarRef }) => {
  return (
    <div
      ref={sideBarRef}
      className={`fixed top-0 left-0 w-56 z-50 h-screen shadow-lg transform transition-transform bg-card duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6">
          Social Media
        </h2>
        <nav>
          <ul className="space-y-2">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <Link
                    to={item.url}
                    className="flex items-center gap-3 p-2 text-foreground hover:bg-accent rounded-lg transition"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
