import { useClickOutside, useDebounce, useSearchedProfileQuery } from "@/hooks";
import { useLogout } from "@/hooks/api/useAuth";
import { useCurrentUserQuery } from "@/hooks/api/useUser";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useNavbar = () => {
  const { data } = useCurrentUserQuery();
  const user = data?.data;
  const navigate = useNavigate();

  const { mutate: logoutUser, isPending } = useLogout();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  const { data: userData } = useSearchedProfileQuery(debouncedSearch);
  const users = userData?.data;

  useClickOutside(dropdownRef, () => {
    setSearch("");
    setMobileSearchOpen(false);
  });

  return {
    user,
    navigate,
    search,
    users,
    setSearch,
    logoutUser,
    isPending,
    dropdownRef,
    mobileSearchOpen,
    setMobileSearchOpen,
  };
};
