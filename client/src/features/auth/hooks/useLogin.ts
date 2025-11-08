// // src/features/auth/hooks/useLogin.ts
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import axios from "axios";
// import { AuthAPI } from "@/features/auth/api/auth.api";
// import type { LoginPayload } from "../types";

// export const useLogin = () => {
//   const navigate = useNavigate();

//   const handleLogin = async (values: LoginPayload) => {
//     try {
//       const result = await AuthAPI.login(values);
//       localStorage.setItem("token", result.data.token);
//       toast.success("Logged in successfully!");
//       navigate("/feed");
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         const statusCode = error.response.status;
//         switch (statusCode) {
//           case 404:
//             toast.error("User does not exist.");
//             break;
//           case 400:
//             toast.error("Invalid credentials.");
//             break;
//           case 401:
//             toast.error("Incorrect password.");
//             break;
//           default:
//             toast.error("Login failed. Try again later.");
//         }
//       } else {
//         toast.error("Network error. Please try again.");
//       }
//     }
//   };

//   return { handleLogin };
// };
