import { api } from "../utils/api/api";

export function ApiGetBuyyedProduct() {
    return api({
        url: "/delivery/products/my-deliveries",
        method: "GET"
    })
}