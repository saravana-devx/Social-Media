import { type AxiosResponse } from "axios";
import api from "../config/axiosConfig";
import { AuthURL } from "../config/axiosUtils";

type LoginData = {
  identifier: string;
  password: string;
};

type SignUPData = {
  email: string;
  userName: string;
  password: string;
};

type ForgotPassword = {
  password: string;
  confirmPassword: string;
};

export const AuthAPI = {
  register: async function (data: SignUPData) {
    console.info(data);
    const response: AxiosResponse = await api.request({
      url: AuthURL.registerUser,
      method: "POST",
      data,
    });
    return response.data;
  },
  login: async function (data: LoginData) {
    const response: AxiosResponse = await api.request({
      url: AuthURL.loginUser,
      method: "POST",
      data,
    });
    return response.data;
  },
  sendPasswordLink: async function (email: string) {
    const response: AxiosResponse = await api.request({
      url: AuthURL.sendPasswordLink,
      method: "POST",
      data: { email },
    });
    return response.data;
  },
  resetForgetPassword: async function (data: ForgotPassword, token: string) {
    const response: AxiosResponse = await api.request({
      url: AuthURL.resetPassword + `?token=${token}`,
      method: "PATCH",
      data,
    });
    return response.data;
  },
};
