import { api } from "../utils/api/api";

export function ApiGetSamsung(search = null, price, type) {
  return api({
    url: "/get/all/products?model=Samsung",
    method: "GET",
    params: {
      search,
      price,
      type,
    },
  });
}

export function ApiGetIphone(search = null, price, type) {
  return api({
    url: "/get/all/products?model=Apple",
    method: "GET",
    params: {
      search,
      price,
      type
    },
  });
}

export function ApiGetXiaomi(search = null, price, type) {
  return api({
    url: "/get/all/products?model=Xiaomi",
    method: "GET",
    params: {
      search,
      price,
      type
    },
  });
}

export function APiGetGoogle(search = null, price, type) {
  return api({
    url: "/get/all/products?model=Google",
    method: "GET",
    params: {
      search,
      price,
      type
    },
  });
}
