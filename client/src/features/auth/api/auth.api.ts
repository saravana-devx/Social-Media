import api from "@/api/config/axiosConfig";
import { AuthURL } from "@/api/config/apiEndpoints";

import type {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyOtpPayload,
} from "../types";

export const AuthAPI = {
  register: async (data: RegisterPayload) => {
    const res = await api.post(AuthURL.registerUser, data);
    return res.data;
  },

  login: async (data: LoginPayload) => {
    const res = await api.post(AuthURL.loginUser, data);
    return res.data;
  },

  sendPasswordLink: async (payload: ForgotPasswordPayload) => {
    const res = await api.post(AuthURL.sendPasswordLink, payload);
    return res.data;
  },

  resetForgetPassword: async (data: ResetPasswordPayload) => {
    const res = await api.patch(AuthURL.resetPassword, data);
    return res.data;
  },

  verifyOtp: async (data: VerifyOtpPayload) => {
    const res = await api.post(AuthURL.verifyOtp, data);
    return res.data;
  },

  resendOtp: async () => {
    const res = await api.get(AuthURL.resendOtp);
    return res.data;
  },

  getCurrentUser: async () => {
    const res = await api.get(AuthURL.currentUser);
    return res.data;
  },

  logout: async () => {
    const res = await api.post(AuthURL.logout);
    return res.data;
  },
};
