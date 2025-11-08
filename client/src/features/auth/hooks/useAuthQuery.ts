import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "@/features/auth/api/auth.api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyOtpPayload,
} from "@/features/auth/types";
import { handleAxiosError } from "@/features/auth";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: LoginPayload) => AuthAPI.login(payload),
    onSuccess: (data) => {
      toast.success(data?.message || "Logged in successfully!");
      navigate("/feed");
    },
    onError: handleAxiosError,
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: RegisterPayload) => AuthAPI.register(payload),
    onSuccess: (data) => {
      toast.success(data?.message || "Registered successfully!");
      navigate("/auth/verify-otp");
    },
    onError: handleAxiosError,
  });
};

export const useVerifyOtpMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => AuthAPI.verifyOtp(payload),
    onSuccess: (data) => {
      toast.success(data?.message || "OTP verified successfully!");
      navigate("/feed");
    },
    onError: handleAxiosError,
  });
};

export const useResendOtpMutation = () => {
  return useMutation({
    mutationFn: () => AuthAPI.resendOtp(),
    onSuccess: (data) => {
      toast.success(data?.message || "OTP re-sent successfully!");
    },
    onError: handleAxiosError,
  });
};

export const useSendPasswordLinkMutation = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      AuthAPI.sendPasswordLink(payload),
    onSuccess: (data) => {
      toast.success(
        data?.message || "Password reset link sent on your provided email!"
      );
    },
    onError: handleAxiosError,
  });
};

export const useResetPasswordMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      AuthAPI.resetForgetPassword(payload),
    onSuccess: (data) => {
      toast.success(data?.message || "Password reset successfully!");
      navigate("/auth/login");
    },
    onError: handleAxiosError,
  });
};

// export const useCurrentUserQuery = () => {
//   return useQuery({
//     queryKey: ["currentUser"],
//     queryFn: () => AuthAPI.getCurrentUser(), // GET endpoint
//     staleTime: 5 * 60 * 1000, // cache for 5 minutes
//   });
// };
