export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  createdAt?: string;
}

export interface AuthResponse {
  status: string;
  token?: string;
  accessToken?: string;
  data?: {
    user: User;
    token?: string;
  };
  user?: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name?: string;
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  status?: string;
}

export interface CurrentUserApiResponse {
  data?:
    | {
        user?: User;
      }
    | User;
  user?: User;
  id?: string;
  email?: string;
  name?: string;
  role?: string;
}
