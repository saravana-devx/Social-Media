import { AuthAPI } from "@/api/shared/auth.api";
import { ProfileAPI } from "@/features/profile/api/profile.api";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: AuthAPI.getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useUserFriendsQuery = (userId: string) => {
  return useQuery({
    queryKey: ["userFriends", userId],
    queryFn: () => ProfileAPI.fetchUserFriends(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 5,
  });
};

export const useSearchedProfileQuery = (search: string) => {
  return useQuery({
    queryKey: ["searchedProfile", search], // include search in queryKey
    queryFn: () => ProfileAPI.searchUsers(search), // pass search here
    enabled: !!search, // prevents query from running when search is empty
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
