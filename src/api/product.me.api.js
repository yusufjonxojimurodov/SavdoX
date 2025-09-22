import { api } from "../utils/api/api";

export function ApiGetProductMe(search = null) {
  return api({
    url: "/api/products/my",
    method: "GET",
    params: {
      search,
    },
  });
}

export function ApiDeleteProductMe(id) {
  return api({
    url: `/api/products/my/${id}`,
    method: "DELETE",
  });
}

export function ApiEditProductMe(id, form) {
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("description", form.description);
  formData.append("price", form.price);
  formData.append("model", form.model);
  formData.append("left", form.left);
  formData.append("discount", form.discount);
  formData.append("type", form.type);
  if (form.image) formData.append("image", form.image);

  return api({
    url: `/api/products/my/product/edit/${id}`,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
}

export function getOneProduct(id) {
  return api({
    url: `/api/products/get/${id}`,
    method: "GET",
  });
}
