import { useMutation, useQueryClient } from "@tanstack/react-query";
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

// we can't add useQueryClient here because
// const qc = useQueryClient();
export const useLoginMutation = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: LoginPayload) => AuthAPI.login(payload),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/feed");
      toast.success(data?.message || "Logged in successfully!");
    },
    onError: handleAxiosError,
  });
};

export const useRegisterMutation = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: RegisterPayload) => AuthAPI.register(payload),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/auth/verify-otp");
      toast.success(data?.message || "Registered successfully!");
    },
    onError: handleAxiosError,
  });
};

export const useVerifyOtpMutation = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => AuthAPI.verifyOtp(payload),
    onSuccess: (data) => {
      navigate("/feed");
      toast.success(data?.message || "OTP verified successfully!");
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
  const qc = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      AuthAPI.resetForgetPassword(payload),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/auth/login");
      toast.success(data?.message || "Password reset successfully!");
    },
    onError: handleAxiosError,
  });
};

export const useLogoutMutation = () => {
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
