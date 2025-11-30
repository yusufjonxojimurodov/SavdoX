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
    deleteLoading: false,
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
          this.messageCount = list.reduce(
            (count, chat) => count + Number(chat.unread_count),
            0
          );
        });

        this.chatLoading = false;
      });

      this.socket.on("new_message", (msg) => {
        useMessage().addMessage(msg.chat_id, msg);

        if (this.userId !== msg.sender_id) {
          notification.info({
            message: `Sizga yangi xabar keldi: ${msg.text}`,
          });
          this.messageCount++;
        }
      });

      this.socket.on("messages_deleted", (deletedIds) => {
        const messageStore = useMessage();
        console.log("men ishlavoman")

        Object.keys(messageStore.messages).forEach((chatId) => {
          if (!Array.isArray(messageStore.messages[chatId])) return;

          messageStore.messages[chatId] = messageStore.messages[chatId].filter(
            (msg) => !deletedIds.includes(msg.id)
          );
        });
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

    readMessage() {
      this.socket.emit("read_messages", {
        userId: this.userId,
        chatId: this.chatId,
      });
    },

    openChat() {
      this.socket.emit("open_chat", {
        userId: this.userId,
        chatId: this.chatId,
      });
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

    deleteMessages(messageIds) {
      if (!this.socket) return;

      this.deleteLoading = true;

      this.socket.emit(
        "delete_messages",
        { userId: this.userId, messageIds },
        (response) => {
          this.deleteLoading = false;

          if (response?.error) {
            notification.error({ message: response.error });
          } else {
            // optional: frontendda instant o'chirish
            this.messages = this.messages.filter(
              (msg) => !response.deletedMessages.includes(msg.id)
            );
          }
        }
      );
    },
  },
});

export default useChat;
