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
};
