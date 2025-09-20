import { defineStore } from "pinia";
import {
  APiGetGoogle,
  ApiGetIphone,
  ApiGetOthers,
  ApiGetSamsung,
  ApiGetXiaomi,
} from "../api/filter.products.api";

const useFilterProducts = defineStore("filterProducts", {
  state: () => ({
    samsungProducts: [],
    xiaomiProducts: [],
    iphoneProducts: [],
    googleProducts: [],
    otherProducts: [],
    loader: false,
  }),

  actions: {
    getSamsungProducts(params = {}) {
      const { search = null, price = null, type = null } = params;
      this.loader = true;

      ApiGetSamsung(search, price, type)
        .then(({ data }) => {
          this.samsungProducts = data;
        })
        .catch((getError) => {
          console.error(getError);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    getIphoneProducts(params = {}) {
      const { search = null, price = null, type = null } = params;
      this.loader = true;
      ApiGetIphone(search, price, type)
        .then(({ data }) => {
          this.iphoneProducts = data;
        })
        .catch((getError) => {
          console.error(getError);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    getXiaomiProducts(params = {}) {
      const { search = null, price = null, type = null } = params;
      this.loader = true;
      ApiGetXiaomi(search, price, type)
        .then(({ data }) => {
          this.xiaomiProducts = data;
        })
        .catch((getError) => {
          console.error(getError);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    getGoogleProducts(params = {}) {
      const { search = null, price = null, type = null } = params;
      this.loader = true;

      APiGetGoogle(search, price, type)
        .then(({ data }) => {
          this.googleProducts = data;
        })
        .catch((getError) => {
          console.error(getError);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    getOtherProducts(params = {}) {
      const { search = null, price = null, type = null } = params;
      this.loader = true;

      ApiGetOthers(search, price, type)
        .then(({ data }) => {
          this.otherProducts = data;
        })
        .catch((getError) => {
          console.error(getError);
        })
        .finally(() => {
          this.loader = false;
        });
    },
  },
});

export default useFilterProducts;
