import { defineStore } from "pinia";
import { ApiGetSamsung } from "../api/filter.products.api";
import { message } from "ant-design-vue";
import { ApiGetIphone } from "../api/filter.products.api";
const useFilterProducts = defineStore("filterProducts", {
  state: () => ({
    samsungProducts: [],
    xiaomiProducts: [],
    iphoneProducts: [],
    loader: false
  }),

  actions: {
    getSamsungProducts() {
        this.loader = true
        ApiGetSamsung()
        .then(({data}) => {
            this.samsungProducts = data
        })
        .catch((getError) => {
            const errorMessage = getError.data?.response?.message || "Samsung mahsulotlarini olishda xatolik"
            message.error(errorMessage)
        })
        .finally(() => {
            this.loader = true
        })
    },
    ApiGetIphone() {
      this.loader = true
      ApiGetIphone()
      .then(({data}) => {
        this.iphoneProducts = data
        
      })
      .catch((getError) => {
        const errorMessage = getError.data?.message || "Iphone mahsulotlarini olishda xatolik"
      })
      .finally(() => {
        this.loader = true
      })
    }
  }
});

export default useFilterProducts