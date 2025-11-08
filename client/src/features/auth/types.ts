export interface AuthUser {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  identifier: string; // username or email
  password: string;
}

export interface RegisterPayload {
  userName: string;
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyOtpPayload {
  otp: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface DecodedToken {
  id: string;
  exp: number;
  iat: number;
}
