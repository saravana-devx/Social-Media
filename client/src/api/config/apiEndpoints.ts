import api from "./axiosConfig";

export const getHeaders = () => {
  const token = localStorage.getItem("token") || "";
  return {
    Authorization: `Bearer ${token}`,
  };
};

// ----------------------------------------------------------
// ----------------------Base Route URL's -------------------
// ----------------------------------------------------------

export const AuthURL = {
  registerUser: "/auth/register",
  loginUser: "/auth/login",
  sendPasswordLink: "/auth/send-password-reset-email",
  resetPassword: "/auth/reset-password",
  verifyOtp: "/auth/verify-otp",
  resendOtp: "/auth/resend-otp",
  currentUser: "/auth/me",
  logout: "/auth/logout",
};

export const MediaURL = {
  signature: "/media/signature",
  save: "/media/save",
};

export const ProfileURL = {
  updateProfile: "/profile/update",
  updateProfileImage: "/profile/profile-image",
  deleteUser: "/profile/delete",
  getUserDetail: (userId: string) => `/profile/user/${userId}`,
  getFriends: "/profile/friends",
  sendFriendRequest: (friendId: string) =>
    `/profile/friend-request/${friendId}`,
  acceptFriendRequest: (requesterId: string) =>
    `/profile/accept-request/${requesterId}`,
  cancelFriendRequest: (targetUserId: string) =>
    `/cancel-request/${targetUserId}`,
  rejectFriendRequest: (requesterId: string) =>
    `/reject-request/${requesterId}`,
  removeFriend: (friendId: string) => `/profile/remove-friend/${friendId}`,
};

export const PostUR = {
  createPost: "/post/create",
};

export const PostURL = {
  getUserPosts: (userId: string, cursor?: string, limit: number = 10) => {
    let url = `/post/user/${userId}?limit=${limit}`;
    if (cursor) url += `&cursor=${cursor}`;
    return url;
  },
};

// export const Post = {
//     createPost: async (mediaId: string, description: string) => {
//       const res = await api.get(PostUR.createPost, { mediaId, description });
//       return res;
//     },
// };
