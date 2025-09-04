import { defineStore } from "pinia";
import {
  ApiGetStatisticProducts,
  ApiGetUserInformation,
} from "../api/statistic.api";
import { message } from "ant-design-vue";

const useStatistic = defineStore("statistic", {
  state: () => ({
    userInfo: {},
    statistic: [],
    loader: false,
  }),

  actions: {
    async GetUserInformation(id) {
      this.loader = true;
      try {
        const { data } = await ApiGetUserInformation(id);
        this.userInfo = data;
      } catch (error) {
        message.error(
          error.response?.data?.message || error.message || "Server xatolik"
        );
      } finally {
        this.loader = false;
      }
    },

    getStatisticProducts(year) {
      this.loader = true;

      ApiGetStatisticProducts(year)
        .then(({ data }) => {
          this.statistic = data;
        })
        .catch((getError) => {
          message.error(getError);
        })
        .finally(() => {
          this.loader = false;
        });
    },
  },
});

export default useStatistic;
