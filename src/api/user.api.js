import { api } from "../utils/api/api";

export function ApiLoginUser(form) {
  return api({
    url: "/api/users/login",
    method: "POST",
    data: form,
  });
}

export function ApiLoginFace(form) {
  return api({
    url: "/api/users/login/face",
    method: "POST",
    data: form,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function ApiGetUserInfo() {
  return api({
    url: "/api/users/getUserMe",
    method: "GET",
  });
}

export function ApiPutUserInfo(form) {
  return api({
    url: "/api/users/update-profile",
    method: "PUT",
    data: form,
  });
}

export function ApiGetComplaint() {
  return api({
    url: "/api/users/my/complaints",
    method: "GET",
  });
}
