import api from "@/api/config/axiosConfig";
import { ProfileURL } from "@/api/config/apiEndpoints";
import type { EditProfilePayload } from "@/features/settings/validation";
import type { AxiosResponse } from "axios";

export const ProfileAPI = {
  updateProfile: async (payload: EditProfilePayload) => {
    const res: AxiosResponse = await api.patch(
      ProfileURL.updateProfile,
      payload
    );
    return res.data;
  },

  updateProfileImage: async (payload: string) => {
    const res: AxiosResponse = await api.patch(ProfileURL.updateProfileImage, {
      secureUrl: payload,
    });
    return res.data;
  },

  deleteUser: async () => {
    const res: AxiosResponse = await api.delete(ProfileURL.deleteUser);
    return res.data;
  },

  getUserDetail: async (userId: string) => {
    const res: AxiosResponse = await api.get(ProfileURL.getUserDetail(userId));
    return res.data;
  },

  getFriends: async () => {
    const res: AxiosResponse = await api.get(ProfileURL.getFriends);
    return res.data;
  },

  sendFriendRequest: async (friendId: string) => {
    const res: AxiosResponse = await api.post(
      ProfileURL.sendFriendRequest(friendId)
    );
    return res.data;
  },

  acceptFriendRequest: async (requesterId: string) => {
    const res: AxiosResponse = await api.post(
      ProfileURL.acceptFriendRequest(requesterId)
    );
    return res.data;
  },

  cancelFriendRequest: async (targetUserId: string) => {
    const res: AxiosResponse = await api.post(
      ProfileURL.cancelFriendRequest(targetUserId)
    );
    return res.data;
  },

  rejectFriendRequest: async (requesterId: string) => {
    const res: AxiosResponse = await api.post(
      ProfileURL.rejectFriendRequest(requesterId)
    );
    return res.data;
  },

  removeFriend: async (friendId: string) => {
    const res: AxiosResponse = await api.delete(
      ProfileURL.removeFriend(friendId)
    );
    return res.data;
  },
};
