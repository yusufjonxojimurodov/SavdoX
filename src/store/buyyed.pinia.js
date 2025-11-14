import { defineStore } from "pinia";
import { ApiGetBuyyedProduct } from "../api/buyyer.products.api";
import { message } from "ant-design-vue";
import useImage from "./image.pinia";

const imageStore = useImage();

const useBuyyedProduct = defineStore("buyyedProduct", {
  state: () => ({
    buyyedProduct: [],
    loader: false,
  }),

  actions: {
    async getBuyyedProduct() {
      this.loader = true;

      try {
        const { data } = await ApiGetBuyyedProduct();

        this.buyyedProduct = data.deliveries;

        // Har bir product uchun rasmlarni faqat bir martalab yuborish
        this.buyyedProduct.forEach((product) => {
          const productId = product.product_id;

          // Agar rasmlar ilgari yuborilgan bo'lsa, yana yubormaymiz
          if (
            !imageStore.urls[productId] ||
            imageStore.urls[productId].length === 0
          ) {
            let images = [];
            try {
              images = Array.isArray(product.product_images)
                ? product.product_images
                : JSON.parse(product.product_images || "[]");
            } catch (e) {
              images = [];
            }

            imageStore.getImagesByProduct(images, productId);
          }
        });
      } catch (err) {
        message.error(err.message || "Mahsulotlarni olishda xato");
      } finally {
        this.loader = false;
      }
    },
  },
});

export default useBuyyedProduct;
