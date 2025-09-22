import { defineStore } from "pinia";
import { ApiGetBuyyedProduct } from "../api/buyyer.products.api";
import { message } from "ant-design-vue";

const useBuyyedProduct = defineStore("buyyedProduct", {
  state: () => ({
    buyyedProduct: [],
    loader: false,
  }),

  actions: {
    getBuyyedProduct() {
      this.loader = true;

      ApiGetBuyyedProduct()
        .then(({ data }) => {
          this.buyyedProduct = data.formattedOrders;
        })
        .catch((getErr) => {
          message.error(getErr);
        })
        .finally(() => {
          this.loader = false;
        });
    },
  },
});

export default useBuyyedProduct