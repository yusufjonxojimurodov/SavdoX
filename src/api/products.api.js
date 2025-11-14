import { api } from "../utils/api/api";

export function ApiCreateProduct(form) {
  return api({
    url: "/api/products/create-product",
    method: "POST",
    data: form,
  });
}

export function ApiGetProducts(search = null, price) {
  return api({
    url: "/api/products",
    method: "GET",
    params: {
      search,
      price,
    },
  });
}

export function ApiBasketProduct(productId) {
  return api({
    url: "/api/basket/add",
    method: "POST",
    data: productId,
  });
}

export function ApiGetBasketProduct() {
  return api({
    url: "/api/basket",
    method: "GET",
  });
}

export function ApiDeleteProduct(productIds) {
  return api({
    url: `/api/basket/delete?ids=${productIds.join(",")}`,
    method: "DELETE",
  });
}

export function ApiDeportProduct(id, form) {
  return api({
    url: `/api/products/complaint/${id}`,
    method: "POST",
    data: form,
  });
}
