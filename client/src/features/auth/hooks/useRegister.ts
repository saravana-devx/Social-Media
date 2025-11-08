// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import axios from "axios";
// import { AuthAPI } from "@/features/auth/api/auth.api";
// import type { RegisterPayload } from "@/features/auth";

// export const useRegister = () => {
//   const navigate = useNavigate();

//   const handleRegister = async (values: RegisterPayload) => {
//     try {
//       await AuthAPI.register(values);
//       toast.success("Registered successfully!");
//       navigate("/auth/verify-otp", { replace: true });
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         const statusCode = error.response.data?.status;
//         switch (statusCode) {
//           case 400:
//             toast.error("Provide credentials.");
//             break;
//           case 409:
//             toast.error("Email or username already in use.");
//             break;
//           default:
//             toast.error("Something went wrong.");
//         }
//       }
//     }
//   };

//   return { handleRegister };
// };
