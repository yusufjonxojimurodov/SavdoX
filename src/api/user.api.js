import { api } from "../utils/api/api";

export function ApiRegisterUser(form) {
  return api({
    url: "/api/register",
    method: "POST",
    data: form,
  });
}

export function ApiLoginUser(form) {
  return api({
    url: "/api/login",
    method: "POST",
    data: form,
  });
}

export function ApiGetUserInfo() {
  return api({
    url: "/api/getUserMe",
    method: "GET",
  });
}
