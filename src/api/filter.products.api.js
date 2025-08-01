import {api} from "../utils/api/api"

export function ApiGetSamsung() {
    return api({
        url: "/get/all/products?model=Samsung",
        method: "GET"
    })
}

export function ApiGetIphone() {
    return api({
        url: "/get/all/products?model=iPhone",
        method: "GET"
    })
}

export function ApiGetXiaomi() {
    return api({
        url: "/get/all/products?model=Xiaomi",
        method: "GET"
    })
}

export function ApiGetSamsungWatch() {
    return api({
        url: "/get/all/products?type=Watch",
        method: "GET"
    })
}