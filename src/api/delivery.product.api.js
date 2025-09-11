import { api } from "../utils/api/api";

export function ApiDeliveryProductPost(productId, address) {
  return api({
    url: `/api/delivery/products/add/${productId}/${address}`,
    method: "POST",
  });
}

export function APiGetDeliveryProduct() {
  return api({
    url: "/api/delivery/products/seller/deliveries",
    method: "GET",
  });
}

export function ApiPutStatus(id, status) {
  return api({
    url: `/api/delivery/products/delivery/${id}/status`,
    method: "PUT",
    data: status,
  });
}
