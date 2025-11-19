export interface CloudinarySignatureResponse {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
}
export interface SavedMediaInDB {
  url: string;
  public_id: string;
  resource_type: string;
  format: string;
  width?: number;
  height?: number;
  createdAt: string;
  updatedAt: string;
  _id?: string;
}

// export interface CloudinaryUploadedMedia {
//   _id: string;
//   url: string;
//   secure_url:string;
//   public_id: string;
//   resource_type: string;
//   format: string;
//   width?: number;
//   height?: number;
//   duration?: number;
//   uploaded?: [];
// }

export interface CloudinaryUploadedMedia {
  public_id: string;
  secure_url: string;
  url: string;
  resource_type: string;
  format: string;
  width?: number;
  height?: number;
  duration?: number;
}

export interface UploadResult {
  uploaded: CloudinaryUploadedMedia;
  media?: SavedMediaInDB; // Only when saveToDB = true
}
