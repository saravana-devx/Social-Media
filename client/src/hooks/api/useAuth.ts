import { AuthAPI } from "@/api/shared/auth.api";
import { handleAxiosError } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogout = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => AuthAPI.logout(),
    onSuccess: (data) => {
      qc.clear();
      navigate("/auth/login");
      toast.success(data?.message || "Logged out successfully!");
    },
    onError: handleAxiosError,
  });
};
