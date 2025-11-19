export { default as LoginPage } from "./pages/LoginPage";
export { default as RegisterPage } from "./pages/RegisterPage";

export {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useSendPasswordLinkMutation,
  useResetPasswordMutation,
} from "./hooks/useAuthMutations";

export * from "../../utils/handleAxiosError";

export * from "./validation";
export * from "./types";
