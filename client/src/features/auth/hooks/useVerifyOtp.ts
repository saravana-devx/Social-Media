// import { toast } from "sonner";
// import axios from "axios";
// import type { VerifyOtpPayload } from "../types";
// import { useNavigate } from "react-router-dom";
// import { AuthAPI } from "../api/auth.api";
// import { useState } from "react";

// export const useVerifyOtp = () => {
//   const navigate = useNavigate();
//   const [isResending, setIsResending] = useState(false);

//   const handleVerifyOtp = async (values: VerifyOtpPayload) => {
//     try {
//       await AuthAPI.verifyOtp(values);
//       toast.success("Email verified successfully!");
//       navigate("/home");
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         const statusCode = error.response.data?.status;
//         switch (statusCode) {
//           case 400:
//             toast.error("Invalid OTP. Please check and try again.");
//             break;
//           case 401:
//             toast.error("OTP has expired. Please request a new one.");
//             break;
//           case 404:
//             toast.error("User not found.");
//             break;
//           default:
//             toast.error("Verification failed. Please try again.");
//         }
//       } else {
//         toast.error("Network error. Please try again.");
//       }
//     }
//   };

//   const handleResendOtp = async () => {
//     try {
//       setIsResending(true);

//       await AuthAPI.resendOtp();
//       toast.success("New OTP sent to your email!");
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         toast.error("Failed to resend OTP. Please try again.");
//       }
//     } finally {
//       setIsResending(false);
//     }
//   };
//   return { handleVerifyOtp, handleResendOtp, isResending };
// };
