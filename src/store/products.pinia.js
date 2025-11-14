import { defineStore } from "pinia";
import {
  ApiBasketProduct,
  ApiCreateProduct,
  ApiDeleteProduct,
  ApiDeportProduct,
  ApiGetBasketProduct,
  ApiGetProducts,
} from "../api/products.api";
import { message } from "ant-design-vue";

const useProducts = defineStore("products", {
  state: () => ({
    products: [],
    productId: null,
    basketProducts: [],
    modalOpen: false,
    loader: false,
    createLoader: false,
    buttonLoader: false,
  }),

  actions: {
    openInfoModal() {
      this.modalOpen = true;
    },

    closeInfoModal() {
      this.modalOpen = false;
    },

    async getProducts(params = {}) {
      const { search = null, price = null } = params;
      this.loader = true;

      try {
        const { data } = await ApiGetProducts(search, price);
        this.products = data;
        this.productId = data.id
      } catch (error) {
        console.error(error);
      } finally {
        this.loader = false;
      }
    },

    async basketProduct(product) {
      try {
        await ApiBasketProduct(product);
        message.success("Mahsulot savatchaga qoshildi");
      } catch (errorBasket) {
        const errorMessage =
          errorBasket.data?.response?.message ||
          "Mahsulotni savatchaga qo'shib bo'lmadi";
        message.error(errorMessage);
      }
    },

    async basketProductGet() {
      this.loader = true;

      try {
        const { data } = await ApiGetBasketProduct();
        this.basketProducts = data;
        this.productId = data.productId
      } catch (errorGet) {
        const errorMessage =
          errorGet.data?.response?.message || "Mahsulot topilmadi";
        message.error(errorMessage);
      } finally {
        this.loader = false;
      }
    },

    async deleteBasketProduct(productIds) {
      this.loader = true;

      return ApiDeleteProduct(productIds)
        .then(() => {
          this.basketProducts = this.basketProducts.filter(
            (item) => !productIds.includes(item.id)
          );
        })
        .catch((errorDelete) => {
          const errorDeleteMessage =
            errorDelete.data?.response?.message ||
            "Mahsulotni savatchadan o'chirib bo'lmadi";
          message.error(errorDeleteMessage);
          throw errorDelete;
        })
        .finally(() => {
          this.loader = false;
        });
    },

    async deportProduct(id, form) {
      this.buttonLoader = true;

      return ApiDeportProduct(id, form)
        .then(() => {
          message.success(
            "Shikoyatingiz jo'natildi. Tez orada sizga bog'lanamiz"
          );
        })
        .catch((postError) => {
          console.log(postError);
          message.error("Shikoyatingizni jo'natishda tizim xatosi");
        })
        .finally(() => {
          this.buttonLoader = false;
        });
    },
  },
});

export default useProducts;
