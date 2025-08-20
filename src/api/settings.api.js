import { api } from "../utils/api/api";

export function ApiPostAvatar(image) {
  const formData = new FormData();
  if (image) formData.append("avatar", image);

  return api({
    url: "/api/users/avatar",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
}

export function ApiGetUserAvatar() {
  return api({
    url: "/api/users/get/avatar",
    method: "GET",
  });
}

export function ApiPostBanner(form) {
  return api({
    url: "/banner/post",
    method: "POST",
    data: form,
  });
}
