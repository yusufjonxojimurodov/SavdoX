import { api } from "../utils/api/api";

export function ApiPostConfirmationProduct(information) {
  return api({
    url: "/api/pending/products/add",
    method: "POST",
    data: information,
  });
}

export function ApiGetPendingProductsBuyer() {
  return api({
    url: "/api/pending/products/my-pending/buyer",
    method: "GET",
  });
}

export function ApiGetPendingProductsSeller() {
  return api({
    url: "/api/pending/products/my-pending/seller",
    method: "GET"
  })
}

export function ApiDeletePendingProducts(id) {
  return api({
    url: `/api/pending/products/delete/${id}`,
    method: "DELETE",
  });
}
