import { defineStore } from "pinia";
import { message } from "ant-design-vue";
import { ApiDeleteProductMe, ApiGetProductMe } from "../api/product.me.api";

const useMeProduct = defineStore("meProduct", {
  state: () => ({
    meProduct: [],
    loader: false,
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
  },
});

export default useMeProduct;
