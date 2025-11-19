import { createBrowserRouter } from "react-router-dom";
import { LoginPage, RegisterPage } from "@/features/auth";
import { LandingPage } from "@/features/landing";
import { HomePage } from "@/features/home";
import NotFound from "@/layout/NotFound";
import MainLayout from "@/layout/MainLayout";
import ForgotPassword from "@/features/auth/components/ForgetPassword";
import ResetPassword from "@/features/auth/components/ResetPassword";
import VerifyOtp from "@/features/auth/components/VerifyOtpForm";
// import ProtectedRoute from "./ProtectedRoute";
import LandingLayout from "@/layout/LandingLayout";
import ChatUI from "./Chatui";
import SettingsPage from "@/features/settings/pages/SettingPage";
import { ProfilePage } from "@/features/profile";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [{ index: true, element: <LandingPage /> }],
  },
  {
    path: "/auth",
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "verify-otp", element: <VerifyOtp /> },
    ],
  },
  {
    element: (
      // <ProtectedRoute>
      <MainLayout />
      // </ProtectedRoute>
    ),
    children: [
      { path: "/feed", index: true, element: <HomePage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/chat", element: <ChatUI /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
