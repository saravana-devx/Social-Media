import { type AxiosResponse } from "axios";
import api from "../../../api/config/axiosConfig";
import type {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyOtpPayload,
} from "../types";
import { AuthURL } from "@/api/config/axiosUtils";

export const AuthAPI = {
  register: async function (data: RegisterPayload) {
    console.info(data);
    const response: AxiosResponse = await api.request({
      url: AuthURL.registerUser,
      method: "POST",
      data,
    });
    return response.data;
  },
  login: async function (data: LoginPayload) {
    const response: AxiosResponse = await api.request({
      url: AuthURL.loginUser,
      method: "POST",
      data,
    });
    return response.data;
  },
  sendPasswordLink: async function (email: ForgotPasswordPayload) {
    const response: AxiosResponse = await api.request({
      url: AuthURL.sendPasswordLink,
      method: "POST",
      data: email,
    });
    return response.data;
  },
  resetForgetPassword: async function (data: ResetPasswordPayload) {
    const response: AxiosResponse = await api.request({
      url: AuthURL.resetPassword,
      method: "PATCH",
      data,
    });
    return response.data;
  },
  verifyOtp: async function (otp: VerifyOtpPayload) {
    const response: AxiosResponse = await api.request({
      url: AuthURL.verifyOtp,
      method: "POST",
      data: otp,
    });
    return response.data;
  },
  resendOtp: async function () {
    const response: AxiosResponse = await api.request({
      url: AuthURL.resendOtp,
      method: "GET",
    });
    return response.data;
  },
};
