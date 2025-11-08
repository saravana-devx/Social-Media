// import { AuthAPI } from "@/features/auth/api/auth.api";
// import { toast } from "sonner";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import type { ForgotPasswordPayload } from "../types";

// export const useForgetPassword = () => {
//   const navigate = useNavigate();

//   const handleSendPasswordEmail = async (values: ForgotPasswordPayload) => {
//     try {
//       await AuthAPI.sendPasswordLink(values);
//       toast.success("Reset password link sent to your email.");
//       navigate("/");
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         const statusCode = error.response.data?.status;
//         switch (statusCode) {
//           case 404:
//             toast.error("Email does not exist.");
//             break;
//           default:
//             toast.error("Failed to send link. Please try again.");
//         }
//       }
//     }
//   };
//   return { handleSendPasswordEmail };
// };
