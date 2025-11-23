import type { AxiosResponse } from "axios";
import { api, PostURL } from "../config";

export const PostAPI = {
  getUserPosts: async (userId: string, cursor?: string, limit = 30) => {
    const newLimit = 40;
    const response: AxiosResponse = await api.get(
      PostURL.getUserPosts(userId, cursor, newLimit)
    );
    return response.data;
  },
  publishPost: async (mediaId: string, description: string) => {
    console.log("media id in publishPost :: ", mediaId);
    const response = await api.post(`/post/create/${mediaId}`, {
      description,
    });
    return response.data;
  },
};
