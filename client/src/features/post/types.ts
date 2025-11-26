export interface PostMedia {
  _id: string;
  url: string;
  resource_type: "image" | "video";
  format: string;
  width?: number;
  height?: number;
}

interface User {
  _id: string;
  userName: string;
  profileImage?: string;
}

export interface Post {
  _id: string;
  userId: User;
  media: PostMedia;
  description: string;
  likes: any[];
  comments: any[];
  shares?: number;
  createdAt: string;
}

export interface PostModalProps {
  post: Post | null;
}
