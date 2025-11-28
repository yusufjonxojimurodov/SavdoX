import { defineStore } from "pinia";
import api from "../../utils/api/api";
import { notification } from "ant-design-vue";

const useMessage = defineStore("message", {
  state: () => ({
    messages: [],
    loading: false,
  }),

  actions: {
    getMessages(chatId) {
      this.loading = true;
      api({
        url: `${import.meta.env.VITE_WEBSOCKET_SERVER_URL}/messages/${chatId}`,
        method: "GET",
      })
        .then(({ data }) => {
          this.messages = data;
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || "Tizim xatosi";
          notification.warn(errorMessage);
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});

export default useMessage