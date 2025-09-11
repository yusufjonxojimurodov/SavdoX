import { api } from "../utils/api/api";

export function ApiGetProductInformation(id) {
  return api({
    url: `/api/products/get/${id}`,
    method: "GET",
  });
}

export function ApiGetSellerInfo(id) {
  return api({
    url: `/api/users/${id}`,
    method: "GET",
  });
}
