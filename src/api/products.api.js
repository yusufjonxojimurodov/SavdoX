import { api } from "../utils/api/api";

export function ApiCreateProduct(form) {
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("description", form.description);
  formData.append("price", form.price);
  formData.append("model", form.model);
  if (form.image) formData.append("image", form.image);

  return api({
    url: "/get/all/products/create-product",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
}

export function ApiGetProducts(search = null, price) {
  return api({
    url: "/get/all/products",
    method: "GET",
    params: {
      search,
      price,
    },
  });
}

export function ApiBasketProduct(productId) {
  return api({
    url: "/basket/add",
    method: "POST",
    data: productId,
  });
}
