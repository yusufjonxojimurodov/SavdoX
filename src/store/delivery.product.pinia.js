import { defineStore } from "pinia";
import { ApiDeliveryProductPost } from "@/api/delivery.product.api";
import { message } from "ant-design-vue";

const useDeliveryProduct = defineStore("deliveryProduct", {
  state: () => ({
    deliveryProduct: [],
    loader: false,
  }),

  actions: {
    async ApiPostDeliveryProduct(productId, address) {
      this.loader = true;

      return ApiDeliveryProductPost(productId, address)
        .then(() => {
          message.success("Mahsulot tasdiqlandi");
        })
        .catch((err) => {
          message.error(err);
        })
        .finally(() => {
          this.loader = false;
        });
    },
  },
});

export default useDeliveryProduct;
