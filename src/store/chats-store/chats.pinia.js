import { defineStore } from "pinia";
import { io } from "socket.io-client";
import api from "@/utils/api/api";
import useMessage from "./messages.pinia";
import { notification } from "ant-design-vue";

const useChat = defineStore("chat", {
  state: () => ({
    socket: null,
    online: false,
    userId: null,
    chatList: [],
    chatId: null,
    messages: {},
    userInfo: {
      openChat: false,
      username: "",
      receiverId: null,
      status: "",
    },
    users: [],
    searchLoading: false,
    chatLoading: false,
    messageLoading: false,
    messageCount: 0,
  }),

  actions: {
    connectSocket(userId) {
      this.chatLoading = true;
      this.userId = userId;
      this.socket = io(import.meta.env.VITE_WEBSOCKET_SERVER_URL);

      this.socket.on("connect", () => {
        console.log("Socket Connected:", this.socket.id);
        this.online = true;

        this.socket.emit("user_online", this.userId);
      });

      this.socket.on("chat_list", (list) => {
        this.chatList = list;

        list.forEach((chat) => {
          if (!this.messages[chat.chat_id]) {
            this.messages[chat.chat_id] = chat.text ? [chat] : [];
          }
        });

        this.chatLoading = false;
      });

      this.socket.on("new_message", (msg) => {
        if (!this.messages[msg.chat_id]) {
          this.messages[msg.chat_id] = [];
        }
        useMessage().messages.push(msg);
        if (this.userId !== msg.sender_id) {
          notification.info({
            message: "Sizga yangi xabar keldi",
          });
          this.messageCount++;
        }
      });

      this.socket.on("disconnect", () => {
        this.online = false;

        console.log("Socket Disconnected");
      });
    },

    sendMessageSocket(receiverId, text, callback) {
      if (!this.socket) return;
      this.messageLoading = true;

      this.socket.emit(
        "send_message",
        {
          senderId: this.userId,
          receiverId,
          text,
        },
        (response) => {
          this.messageLoading = false;

          if (response?.error) {
            notification.error(response.error);
          }
          callback?.();
        }
      );
    },

    searchUsers(username = "") {
      this.searchLoading = true;
      api({
        url: `${import.meta.env.VITE_WEBSOCKET_SERVER_URL}/search-users`,
        method: "GET",
        params: {
          username: username,
        },
      })
        .then(({ data }) => {
          this.users = data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.searchLoading = false;
        });
    },
  },
});

export default useChat;
