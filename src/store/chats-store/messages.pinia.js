import { defineStore } from "pinia";
import api from "@/utils/api/api";
import { message, notification } from "ant-design-vue";
import useRegister from "../register.pinia";

const useMessage = defineStore("message", {
  state: () => ({
    messages: {},
    loading: false,
    deleteLoading: false,
    websocket_server_url: import.meta.env.VITE_WEBSOCKET_SERVER_URL,
  }),

  actions: {
    getMessages(chatId) {
      this.loading = true;
      api({
        url: `${this.websocket_server_url}/messages/${chatId}`,
        method: "GET",
      })
        .then(({ data }) => {
          this.messages[chatId] = data;
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

    addMessage(chatId, msg) {
      if (!this.messages[chatId]) this.messages[chatId] = [];
      this.messages[chatId].push(msg);
    },

    deleteMessages(messages) {
      this.deleteLoading = true;

      return api({
        url: `${this.websocket_server_url}/delete-messages`,
        method: "DELETE",
        data: {
          messageIds: messages,
          userId: useRegister().user.id,
        },
      })
        .then(() => {
          message.success("Tanlangan xabarlar o'chirildi");
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.error || "Tizim xatosi";
          notification.warn(errorMessage);
          console.error(error);
        })
        .finally(() => {
          this.deleteLoading = false;
        });
    },
  },
});

export default useMessage;
