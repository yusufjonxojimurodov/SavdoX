import { api } from "../utils/api/api";

export function ApiCreateProduct(form) {
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("description", form.description);
  formData.append("price", form.price);
  formData.append("model", form.model);
  formData.append("left", form.left);
  formData.append("type", form.type);
  formData.append("discount", form.discount);
  if (form.images && form.images.length > 0) {
    form.images.forEach((img) => {
      formData.append("images", img);
    });
  }

  return api({
    url: "/api/products/create-product",
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
