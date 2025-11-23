import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyOtpPayload,
} from "../types";

import { AuthAPI } from "../api/auth.api";
import { toast } from "sonner";
import { handleAxiosError } from "@/utils";

// we can't add useQueryClient here because
// const qc = useQueryClient();
export const useAuthLogin = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: LoginPayload) => AuthAPI.login(payload),
    onSuccess: (data) => {
      console.log("data : ", data);
      if (data?.data?.askLogoutPrevious) {
        return;
      }
      qc.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/home");
      toast.success(data?.message || "Logged in successfully!");
    },

    onError: handleAxiosError,
  });
};

export const useRegister = () => {
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

export const useVerifyOtp = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => AuthAPI.verifyOtp(payload),
    onSuccess: (data) => {
      navigate("/home");
      toast.success(data?.message || "OTP verified successfully!");
    },
    onError: handleAxiosError,
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: () => AuthAPI.resendOtp(),
    onSuccess: (data) => {
      toast.success(data?.message || "OTP re-sent successfully!");
    },
    onError: handleAxiosError,
  });
};

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      AuthAPI.sendPasswordRestLink(payload),
    onSuccess: (data) => {
      toast.success(
        data?.message || "Password reset link sent on your provided email!"
      );
    },
    onError: handleAxiosError,
  });
};

export const useResetPassword = () => {
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
