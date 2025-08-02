import { api } from "../utils/api/api";

export function ApiGetSamsung(search = null, price) {
  return api({
    url: "/get/all/products?model=Samsung",
    method: "GET",
    params: {
      search,
      price,
    },
  });
}

export function ApiGetIphone(search = null, price) {
  return api({
    url: "/get/all/products?model=iPhone",
    method: "GET",
    params: {
      search,
      price,
    },
  });
}

export function ApiGetXiaomi(search = null, price) {
  return api({
    url: "/get/all/products?model=Xiaomi",
    method: "GET",
    params: {
      search,
      price,
    },
  });
}

export function ApiGetSamsungWatch() {
  return api({
    url: "/get/all/products?type=Watch",
    method: "GET",
  });
}
