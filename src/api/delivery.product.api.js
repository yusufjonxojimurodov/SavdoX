import { api } from "../utils/api/api";

export function ApiDeliveryProductPost(productId, address) {
  return api({
    url: `/delivery/products/add/${productId}/${address}`,
    method: "POST",
  });
}
