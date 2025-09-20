import { defineStore } from "pinia";
import {
  ApiBasketProduct,
  ApiCreateProduct,
  ApiDeleteProduct,
  ApiGetBasketProduct,
  ApiGetProducts,
} from "../api/products.api";
import { message } from "ant-design-vue";

const useProducts = defineStore("products", {
  state: () => ({
    products: [],
    basketProducts: [],
    loader: false,
    createLoader: false,
  }),

  actions: {
    async createProduct(form) {
      this.loader = true;
      try {
        const { data } = await ApiCreateProduct(form);
        this.products = data;
        message.success("Mahsulot Yaratildi");
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          "Mahsulot yaratishda xatolik yuzaga keldi";
        message.error(errorMessage);
      } finally {
        this.loader = false;
      }
    },

    async getProducts(params = {}) {
      const { search = null, price = null } = params;
      this.loader = true;

      try {
        const { data } = await ApiGetProducts(search, price);
        this.products = data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loader = false;
      }
    },

    async basketProduct(productId) {
      try {
        await ApiBasketProduct(productId);
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
            (item) => !productIds.includes(item._id)
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
  },
});

export default useProducts;
