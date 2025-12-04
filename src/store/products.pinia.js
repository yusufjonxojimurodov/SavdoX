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
import api from "../utils/api/api";

const useProducts = defineStore("products", {
  state: () => ({
    products: [],
    models: [],
    types: [],
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

    getModels() {
      api({
        url: "/api/products/models",
        method: "GET",
      })
        .then(({ data }) => {
          this.models = data.models;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getTypes() {
      api({
        url: "/api/products/types",
        method: "GET",
      })
        .then(({ data }) => {
          this.types = data.types;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async getProducts(params = {}) {
      const { search = null, price = null } = params;
      this.loader = true;

      try {
        const { data } = await ApiGetProducts(search, price);
        this.products = data;
        this.productId = data.id;
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
        this.productId = data.productId;
      } catch (errorGet) {
        console.error(errorGet);
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
