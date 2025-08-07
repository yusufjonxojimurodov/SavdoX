import { defineStore } from "pinia";
import { ApiGetProductInformation } from "../api/product.info";
import { message } from "ant-design-vue";

const useProductInfo = defineStore('product', {
    state: () => ({
        product: [],
        loader: false
    }),

    actions: {
        getProductInfo(id) {
            this.loader = true

            ApiGetProductInformation(id)
            .then(({data}) => {
                this.product = data
                this.loader = true
            })
            .catch((getErr) => {
                const errorMessage = getErr.data?.response?.message || "Server Xatosi"
                message.error(errorMessage)
            })
            .finally(() => {
                this.loader = false
            })
        }
    }
})

export default useProductInfo