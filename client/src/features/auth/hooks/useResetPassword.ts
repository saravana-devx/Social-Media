// import { useNavigate, useSearchParams } from "react-router-dom";
// import { toast } from "sonner";
// import axios from "axios";
// import { AuthAPI } from "@/features/auth/api/auth.api";
// import type { ResetPasswordPayload } from "../types";

// export const useResetPassword = () => {
//   const navigate = useNavigate();

//   const [searchParams] = useSearchParams();

//   const handleResetPassword = async (values: ResetPasswordPayload) => {
//     try {
//       const token = searchParams.get("token");
//       if (!token) {
//         toast.error("Reset token is missing or invalid.");
//         return;
//       }
//       await AuthAPI.resetForgetPassword(
//         {
//           newPassword: values.newPassword,
//           confirmPassword: values.confirmPassword,
//         },
//         token
//       );
//       toast.success("Password reset successfully.");
//       setTimeout(() => navigate("/auth/login"), 1200);
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         const statusCode = error.response.data?.status;
//         switch (statusCode) {
//           case 404:
//             toast.error("Email does not exist.");
//             break;
//           case 409:
//             toast.error("Please check your credentials.");
//             break;
//           case 401:
//             toast.error("Invalid or expired reset link.");
//             break;
//           default:
//             toast.error("Password reset failed.");
//         }
//       }
//     }
//   };
//   return { handleResetPassword };
// };
