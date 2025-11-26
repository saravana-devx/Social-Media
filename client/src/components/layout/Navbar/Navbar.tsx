import React from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Crown,
  Search,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavbar } from "./UseNavbar";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  onMobileMenuToggle?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle }) => {
  const {
    user,
    navigate,
    search,
    setSearch,
    users,
    logoutUser,
    isPending,
    dropdownRef,
    mobileSearchOpen,
    setMobileSearchOpen,
  } = useNavbar();

  return (
    <div className="w-full py-3 md:py-4 px-3 sm:px-4 md:px-6 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 max-w-7xl mx-auto">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 hover:bg-accent rounded-xl shrink-0"
        >
          <Menu className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
        </Button>

        {/* Logo */}
        <Link
          to="/home"
          className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity flex-1 md:flex-initial"
        >
          Linkora
        </Link>

        {/* Desktop Search Bar */}
        <div
          ref={dropdownRef}
          className="relative hidden md:flex w-full max-w-md mx-auto"
        >
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            className="pl-10 bg-background/80"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

          {/* Desktop Search Dropdown */}
          {users?.length > 0 && search && (
            <div className="absolute top-12 w-full bg-card/95 backdrop-blur-xl border-2 border-border rounded-xl shadow-2xl max-h-80 overflow-y-auto z-50">
              {users.map((u: any) => (
                <Link
                  to={`/profile/${u.userName}`}
                  key={u._id}
                  className="flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors"
                  onClick={() => setSearch("")}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={u.profileImage}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {u.firstName?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">
                      {u.firstName} {u.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      @{u.userName}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-xl"
          >
            {mobileSearchOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Search className="w-5 h-5 text-foreground" />
            )}
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative group select-none">
                <Avatar className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 cursor-pointer ring-2 ring-border hover:ring-primary transition-all duration-300 group-hover:scale-105">
                  <AvatarImage
                    src={user?.profileImage}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-sm">
                    {user?.firstName?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 md:h-4 md:w-4 bg-green-500 rounded-full border-2 border-card"></div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="select-none w-72 sm:w-80 p-4 rounded-2xl shadow-2xl bg-card/95 backdrop-blur-xl border-2 border-border z-50"
              align="end"
            >
              <DropdownMenuGroup className="flex items-center gap-3 sm:gap-4 p-3 mb-3 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl">
                <Avatar className="w-14 h-14 sm:w-16 sm:h-16 ring-4 ring-primary/20">
                  <AvatarImage
                    src={user?.profileImage}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {user?.firstName?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-foreground truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <Crown className="w-4 h-4 text-yellow-500 shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground truncate mb-2">
                    @{user?.userName}
                  </p>
                  <Button
                    size="sm"
                    className="w-full rounded-lg shadow-md"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-3" />
              <DropdownMenuLabel className="px-2 text-xs font-semibold uppercase tracking-wide">
                Account
              </DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => navigate("/settings")}
                className="flex items-center gap-3 hover:bg-accent/50 rounded-xl px-3 py-3 cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <Settings className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">Settings & Privacy</p>
                  <p className="text-xs text-muted-foreground truncate">
                    Manage your account
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigate("/support")}
                className="flex items-center gap-3 hover:bg-accent/50 rounded-xl px-3 py-3 cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-accent/10">
                  <HelpCircle className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">Help & Support</p>
                  <p className="text-xs text-muted-foreground truncate">
                    Get assistance
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-3" />

              {/* Logout */}
              <DropdownMenuItem
                onClick={() => logoutUser()}
                disabled={isPending}
                className="flex items-center gap-3 hover:bg-destructive/10 rounded-xl px-3 py-3 cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-destructive/10">
                  <LogOut className="w-4 h-4 text-destructive" />
                </div>
                <p className="font-medium text-destructive">
                  {isPending ? "Signing out..." : "Sign Out"}
                </p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {mobileSearchOpen && (
        <div ref={dropdownRef} className="md:hidden mt-3 pb-2 relative">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            className="pl-10 bg-background/80"
            autoFocus
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

          {/* Mobile Search Dropdown */}
          {users?.length > 0 && search && (
            <div className="absolute top-12 left-0 right-0 bg-card/95 backdrop-blur-xl border-2 border-border rounded-xl shadow-2xl max-h-72 overflow-y-auto z-50">
              {users.map((u: any) => (
                <Link
                  to={`/profile/${u.userName}`}
                  key={u._id}
                  className="flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors"
                  onClick={() => {
                    setSearch("");
                    setMobileSearchOpen(false);
                  }}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={u.profileImage}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {u.firstName?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {u.firstName} {u.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      @{u.userName}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
