import api from "@/api/config/axiosConfig";
import type { AxiosResponse } from "axios";
import { PostURL } from "@/api/config/apiEndpoints";

// export const PostAPI = {
//   getUserPosts: async (userId: string, page = 1, limit = 10) => {
//     const response: AxiosResponse = await api.get(
//       PostURL.getUserPosts(userId, page, limit)
//     );
//     return response.data.data; // backend returns {status, message, data}
//   },
// };

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
      // mediaId,
      description,
    });

    return response.data;
  },
};
