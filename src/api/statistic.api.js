import { api } from "../utils/api/api";

export function ApiGetUserInformation(id) {
    return api({
        url: `/api/users/user/${id}`,
        method: "GET",
    })
}

export function ApiGetStatisticProducts(year) {
    return api({
        url: "/api/montlhy/sales",
        method: "GET",
        params: {
            year
        }
    })
}