import { api } from "../utils/api/api";

export function ApiPostConfirmationProduct(information) {
  return api({
    url: "/pending/products/add",
    method: "POST",
    data: information,
  });
}

export function ApiGetPendingProductsBuyer() {
  return api({
    url: "/pending/products/my-pending/buyer",
    method: "GET",
  });
}

export function ApiGetPendingProductsSeller() {
  return api({
    url: "/pending/products/my-pending/seller",
    method: "GET"
  })
}

export function ApiDeletePendingProducts(id) {
  return api({
    url: `/pending/products/delete/${id}`,
    method: "DELETE",
  });
}
