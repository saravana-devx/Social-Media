// ----------------------------------------------------------
// ---------------------- Auth URLs -------------------------
// ----------------------------------------------------------

export const AuthURL = {
  register: "/auth/register",
  login: "/auth/login",
  forceLogin: "/auth/force-login",
  verifyOtp: "/auth/verify-otp",
  resendOtp: "/auth/resend-otp",
  sendResetLink: "/auth/send-password-reset-email",
  resetPassword: "/auth/reset-password",
  me: "/auth/me",
  logout: "/auth/logout",
};

// ----------------------------------------------------------
// ---------------------- Media URLs ------------------------
// ----------------------------------------------------------

export const MediaURL = {
  signature: "/media/signature",
  upload: "/media/save",
  uploadToCloudinary: (cloudName: string) =>
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
};

// ----------------------------------------------------------
// ---------------------- Profile URLs ----------------------
// ----------------------------------------------------------

export const ProfileURL = {
  update: "/profile/update",
  updateImage: "/profile/profile-image",
  delete: "/profile/delete",

  // Dynamic URLs
  userDetail: (userId: string) => `/profile/user/${userId}`,
  friends: (userId: string) => `/profile/friends/${userId}`,

  // Friend Requests
  sendRequest: (friendId: string) => `/profile/friend-request/${friendId}`,
  acceptRequest: (requesterId: string) =>
    `/profile/accept-request/${requesterId}`,
  cancelRequest: (targetUserId: string) =>
    `/profile/cancel-request/${targetUserId}`,
  rejectRequest: (requesterId: string) =>
    `/profile/reject-request/${requesterId}`,
  removeFriend: (friendId: string) => `/profile/remove-friend/${friendId}`,

  // Search
  searchUsers: (search: string) =>
    `/profile/search-profile?search=${encodeURIComponent(search)}`,
};

// ----------------------------------------------------------
// ---------------------- Post URLs ----------------------
// ----------------------------------------------------------

export const PostURL = {
  createPost: "/post/create",
  getUserPosts: (userId: string, cursor?: string, limit: number = 10) => {
    let url = `/post/user/${userId}?limit=${limit}`;
    if (cursor) url += `&cursor=${cursor}`;
    return url;
  },
  getUser: (searchId: string) => `/profile//user/${searchId}`,
};
