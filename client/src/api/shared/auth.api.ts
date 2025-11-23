import { api, AuthURL } from "../config";

export const AuthAPI = {
  getCurrentUser: async () => {
    const res = await api.get(AuthURL.me);
    return res.data;
  },
  logout: async () => {
    const res = await api.post(AuthURL.logout);
    return res.data;
  },
};
