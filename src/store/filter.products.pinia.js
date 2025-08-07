import { defineStore } from "pinia";
import {
  APiGetGoogle,
  ApiGetIphone,
  ApiGetSamsung,
  ApiGetXiaomi,
} from "../api/filter.products.api";
import { message } from "ant-design-vue";
const useFilterProducts = defineStore("filterProducts", {
  state: () => ({
    samsungProducts: [],
    xiaomiProducts: [],
    iphoneProducts: [],
    googleProducts: [],
    loader: false,
  }),

  actions: {
    getSamsungProducts(params = {}) {
      const { search = null, price = null } = params;
      this.loader = true;

      ApiGetSamsung(search, price)
        .then(({ data }) => {
          this.samsungProducts = data;
        })
        .catch((getError) => {
          const errorMessage =
            getError.response?.data?.message ||
            "Samsung mahsulotlarini olishda xatolik";
          message.error(errorMessage);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    getIphoneProducts(params = {}) {
      const { search = null, price = null } = params;
      this.loader = true;
      ApiGetIphone(search, price)
        .then(({ data }) => {
          this.iphoneProducts = data;
        })
        .catch((getError) => {
          const errorMessage =
            getError.data?.response?.message ||
            "Iphone mahsulotlarini olishda xatolik";
          message.error(errorMessage);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    getXiaomiProducts(params = {}) {
      const { search = null, price = null } = params;
      this.loader = true;
      ApiGetXiaomi(search, price)
        .then(({ data }) => {
          this.xiaomiProducts = data;
        })
        .catch((getError) => {
          const errorMessage =
            getError.data?.response?.message || "Mahsulot olishda xatolik";
          message.error(errorMessage);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    getGoogleProducts(params = {}) {
      const { search = null, price = null } = params;
      this.loader = true;

      APiGetGoogle(search, price)
        .then(({ data }) => {
          this.googleProducts = data;
        })
        .catch((getError) => {
          const errorMessage =
            getError.data?.response?.message ||
            "Internetingizni tekshirib ko'ring";
          message.error(errorMessage);
        })
        .finally(() => {
          this.loader = false;
        });
    },
  },
});

export default useFilterProducts;
