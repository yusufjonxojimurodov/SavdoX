import { api } from "../utils/api/api";

export function ApiGetBuyyedProduct() {
    return api({
        url: "/api/delivery/products/my-deliveries",
        method: "GET"
    })
}