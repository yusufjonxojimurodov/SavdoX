import { defineStore } from "pinia";
import {
  ApiDeliveryProductPost,
  APiGetDeliveryProduct,
  ApiPutStatus,
} from "../api/delivery.product.api";
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

    getDeliveryProducts() {
      this.loader = true;

      APiGetDeliveryProduct()
        .then(({ data }) => {
          this.deliveryProduct = data.deliveries;
        })
        .catch((errorGet) => {
          message.error(errorGet);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    async putDeliveryProductStatus(id, status) {

      return ApiPutStatus(id, status)
        .then(() => {
          message.success("Mahsulotning holati yangilandi");
        })
        .catch((error) => {
          message.error(error);
        })
    },
  },
});

export default useDeliveryProduct;
