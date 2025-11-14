import { api } from "@/utils/api/api";

export function ApiPostAvatar(image) {
  const formData = new FormData();
  if (image) formData.append("avatar", image);

  return api({
    url: "/api/avatar/users/avatar",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
}

export function ApiGetUserAvatar(hashId) {
  return api({
    url: `/api/upload/avatar/${hashId}`,
    method: "GET",
  });
}
