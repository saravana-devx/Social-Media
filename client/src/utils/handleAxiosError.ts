import { AxiosError } from "axios";
import { toast } from "sonner";

export const handleAxiosError = (error: AxiosError<any>) => {
  const backendMessage = error.response?.data?.message;
  if (backendMessage) {
    toast.error(backendMessage);
  }
};
