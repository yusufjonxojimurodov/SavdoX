import axios from "axios";

const instance = axios.create({
  baseURL: "https://savdo-x-1.onrender.com",
  timeout: 20000,
});

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
