import { defineStore } from "pinia";
import api from "../utils/api/api";
import { message } from "ant-design-vue";

const useBanner = defineStore("banner", {
  state: () => ({
    banners: [],
    loader: false,
  }),
  actions: {
    getBanners() {
      this.loader = true;

      api({
        url: "/api/banner",
        method: "GET",
      })
        .then(({ data }) => {
          this.banners = data;
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || "Tizim xatosi";
          message.warn(errorMessage);
          console.error(error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
  },
});

export default useBanner;