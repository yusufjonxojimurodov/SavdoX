import { api } from "../utils/api/api";

export function ApiGetProductInformation(id) {
    return api({
        url: `/get/all/products/${id}`,
        method: 'GET',
    })
}