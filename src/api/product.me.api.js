import { api } from "../utils/api/api";

export function ApiGetProductMe(search = null) {
  return api({
    url: "/get/all/products/my",
    method: "GET",
    params: {
      search,
    },
  });
}

export function ApiDeleteProductMe(id) {
    return api({
        url: `/get/all/products/my/${id}`,
        method: "DELETE"
    })
}