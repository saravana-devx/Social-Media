import { AxiosError } from "axios";
import { toast } from "sonner";

export const handleAxiosError = (error: AxiosError<any>) => {
  const backendMessage = error.response?.data?.message;

  if (backendMessage) {
    toast.error(backendMessage);
  } else if (error.message === "Network Error") {
    toast.error("Network error. Please check your connection.");
  } else {
    toast.error("Something went wrong. Please try again.");
  }
};
