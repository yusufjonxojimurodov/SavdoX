import { notification } from "ant-design-vue";
import { defineStore } from "pinia";
import api from "../utils/api/api";

const useImage = defineStore("image", {
  state: () => ({
    urls: {},
    uploadLoading: false,
    loading: {},
    loadingProducts: new Set(),
  }),

  actions: {
    async getImagesByProduct(hashIds, productId) {
      if (this.urls[productId] || this.loadingProducts.has(productId)) return;

      this.loadingProducts.add(productId);
      this.loading[productId] = true;

      try {
        const { data } = await api({
          url: "/api/image/batch",
          method: "POST",
          data: { hashIds, productId },
        });

        const urls = data.images.map(
          (img) => `data:${img.mimetype};base64,${img.base64}`
        );

        this.urls = {
          ...this.urls,
          [productId]: urls,
        };
      } catch (err) {
        console.error(err);
        notification.error({ message: "Rasmlarni yuklashda xatolik" });
      } finally {
        this.loadingProducts.delete(productId);
        this.loading[productId] = false;
      }
    },
  },
});

export default useImage;
