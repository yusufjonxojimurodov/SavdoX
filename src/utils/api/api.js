import axios from "axios";
import router from "@/routers/router";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 429
      ) {
        router.push("/500");
      }
    }
    return Promise.reject(error);
  }
);

export const api = ({ url, open = false, ...props }) => {
  const token = localStorage.getItem("access_token");

  if (!open) {
    props.headers = {
      Authorization: `Bearer ${token}`,
      ...props.headers,
    };
  }

  return instance({
    url,
    ...props,
  });
};

export { instance as axiosInstance };
export default api;
