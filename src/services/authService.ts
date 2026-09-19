import { api } from "@/api/axiosClient";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
  CurrentUserApiResponse,
} from "@/types/auth";

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", payload);
    return response.data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", payload);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<CurrentUserApiResponse>("/users/me");
    const resData = response.data;let user: User | undefined;

    if ("data" in resData && resData.data) {
      if ("user" in resData.data && resData.data.user) {
        user = resData.data.user;
      } else if ("email" in resData.data) {
        user = resData.data as User;
      }
    } else if ("user" in resData && resData.user) {
      user = resData.user;
    } else if ("email" in resData) {
      user = resData as unknown as User;
    }

    if (!user || !user.email) {
      throw new Error("Invalid user profile returned by the server");
    }

    return user;
  },
  
  

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("accessToken");
    }
  },
};
