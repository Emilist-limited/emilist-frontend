export interface RegisterType {
  email: string;
  password: string;
  userName: string;
}

export interface VerifyEmailParams {
  email: string;
}

export interface ResetPasswordType {
  newPassword: string;
  otp: string;
}

export interface ChangePasswordType {
  currentPassword: string;
  newPassword: string;
}
