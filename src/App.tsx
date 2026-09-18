import { useEffect } from "react";
import { api } from "@/api/axiosClient";



export default function App() {
  useEffect(() => {
    console.log("Active API Base URL:", import.meta.env.VITE_API_BASE_URL);

    api.get("/health")
      .then((res) => console.log("Health check result:", res.data))
      .catch((err) => console.error("API call failed:", err));
  }, []);

  return <div className="p-6 font-semibold">Mind Vault App</div>;
}