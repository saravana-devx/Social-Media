import { HTTP_STATUS } from "../constants";

interface ApiResponseInterface {
  status: number;
  message?: string;
  data?: any;
  success?: boolean;
}

class ApiResponse {
  status: number;
  data: any;
  message: string;
  success: boolean;

  constructor({ status, data = null, message = "Success", success }: ApiResponseInterface) {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = success !== undefined ? success : status < HTTP_STATUS.BAD_REQUEST;
  }

  // 🔹 Helper Methods
  static success(data: any, message = "Success", status = HTTP_STATUS.OK) {
    return new ApiResponse({ status, data, message });
  }

  static created(data: any, message = "Created") {
    return new ApiResponse({ status: HTTP_STATUS.CREATED, data, message });
  }

  static fail(message = "Error", status = HTTP_STATUS.BAD_REQUEST) {
    return new ApiResponse({ status, message, success: false });
  }
}

export { ApiResponse };

