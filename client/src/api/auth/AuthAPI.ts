import { type AxiosResponse } from "axios";
import api from "../config/axiosConfig";
import { AuthURL } from "../config/axiosUtils";

type SignUPData = {
  email: string;
  userName: string;
  password: string;
};

type ForgotPassword = {
  password : string,
  confirmPassword : string,
}

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
  login: async function (identifier: string, password: string) {
    const response: AxiosResponse = await api.request({
      url: AuthURL.loginUser,
      method: "POST",
      data: { identifier, password },
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
  resetForgetPassword: async function (
    data : ForgotPassword,
    token: string
  ) {
    const response: AxiosResponse = await api.request({
      url: AuthURL.resetPassword + `?token=${token}`,
      method: "PATCH",
      data
    });
    return response.data;
  },
};
