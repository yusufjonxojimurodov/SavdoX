import { defineStore } from "pinia";
import { message } from "ant-design-vue";
import {
  ApiDeleteProductMe,
  ApiEditProductMe,
  ApiGetProductMe,
  getOneProduct,
} from "../api/product.me.api";

const useMeProduct = defineStore("meProduct", {
  state: () => ({
    meProduct: [],
    oneProduct: {},
    loader: false,
    getLoader: false,
  }),

  actions: {
    GetMeProduct(params = {}) {
      const { search = null } = params;
      this.loader = true;
      ApiGetProductMe(search)
        .then(({ data }) => {
          this.meProduct = data;
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    async deleteMeProduct(id) {
      return ApiDeleteProductMe(id)
        .then(() => {
          message.success("Mahsulotingiz Sotuvdan olindi");
          return true;
        })
        .catch((deleteError) => {
          message.error(deleteError);
        })
        .finally(() => {});
    },
    async editProductMe(id, form) {
      this.loader = true;
      try {
        await ApiEditProductMe(id, form);
        message.success("Mahsulotingiz yangilandi");
        await this.GetMeProduct();
      } catch {
        message.error("Mahsulotingizni yangilashda xatolik");
      } finally {
        this.loader = false;
      }
    },

    async getOneProductInfo(id) {
      this.loader = true;

      try {
        const { data } = await getOneProduct(id);
        this.oneProduct = data;
        return data;
      } catch (error) {
        message.error(error);
      } finally {
        this.loader = false;
      }
    },
  },
});

export default useMeProduct;
