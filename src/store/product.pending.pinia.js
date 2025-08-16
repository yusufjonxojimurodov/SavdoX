import { defineStore } from "pinia";
import {
  ApiDeletePendingProducts,
  ApiGetPendingProductsBuyer,
  ApiGetPendingProductsSeller,
  ApiPostConfirmationProduct,
} from "../api/confirmation.product.api";
import { message } from "ant-design-vue";

const usePendingProduct = defineStore("pendingProduct", {
  state: () => ({
    pendingProductBuyer: [],
    pendingProductSeller: [],
    loader: false,
    buttonLoader: false,
  }),

  actions: {
    async ApiPostPendingProduct(information) {
      this.loader = true;

      return ApiPostConfirmationProduct(information)
        .then(() => {
          message.success(
            "Sizga aloqaga chiqib mahsulotni tasdiqlaymiz. 24 soatgacha vaqt olishi mumkin"
          );
        })
        .catch((errPost) => {
          message.error("Xato" + errPost);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    getPendingProductBuyer() {
      this.loader = true;

      ApiGetPendingProductsBuyer()
        .then(({ data }) => {
          this.pendingProductBuyer = data;
        })
        .catch((errGet) => {
          message.error("Xato" + errGet);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    async deletePendingProduct(id) {
      this.buttonLoader = true;

      return ApiDeletePendingProducts(id)
        .then(() => {
          message.success("Mahsulot bekor qilindi");
          this.getPendingProductBuyer();
        })
        .catch(() => {
          message.error(
            "Mahsulot Bekor qilishda xatolik.\nAdminga bog'lanib ko'ring"
          );
        })
        .finally(() => {
          this.buttonLoader = false;
        });
    },

    getPendingProductSeller() {
      this.loader = true;

      ApiGetPendingProductsSeller()
        .then(({ data }) => {
          this.pendingProductSeller = data;
        })
        .catch((getErr) => {
          message.error(getErr);
        })
        .finally(() => {
          this.loader = false;
        });
    },
  },
});

export default usePendingProduct;
