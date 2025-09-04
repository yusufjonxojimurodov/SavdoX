import { api } from "../utils/api/api";

export function ApiGetUserInformation(id) {
    return api({
        url: `/users/${id}`,
        method: "GET",
    })
}

export function ApiGetStatisticProducts(year) {
    return api({
        url: "/montlhy/sales",
        method: "GET",
        params: {
            year
        }
    })
}