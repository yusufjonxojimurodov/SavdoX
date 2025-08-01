import { defineStore } from "pinia";
import {
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
    loader: false,
  }),

  actions: {
    getSamsungProducts() {
      this.loader = true;
      ApiGetSamsung()
        .then(({ data }) => {
          this.samsungProducts = data;
        })
        .catch((getError) => {
          const errorMessage =
            getError.data?.response?.message ||
            "Samsung mahsulotlarini olishda xatolik";
          message.error(errorMessage);
        })
        .finally(() => {
          this.loader = true;
        });
    },

    getIphoneProducts() {
      this.loader = true;
      ApiGetIphone()
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
          this.loader = true;
        });
    },

    getXiaomiProducts() {
      this.loader = true;
      ApiGetXiaomi()
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
  },
});

export default useFilterProducts;
