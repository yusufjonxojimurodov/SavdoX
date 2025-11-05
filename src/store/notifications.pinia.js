import { notification } from "ant-design-vue";
import { defineStore } from "pinia";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const WS_PROTOCOL = SERVER_URL.startsWith("https") ? "wss" : "ws";
const WS_HOST = SERVER_URL.replace(/^https?:\/\//, "");

export const useNotification = defineStore("notification", {
  state: () => ({
    notifications: [],
    socket: null,
    connected: false,
    notifSound: new Audio("/public/audios/cheerful-527.mp3"),
  }),
  actions: {
    connectWebSocket(userId) {
      if (this.connected) return;

      const url = `${WS_PROTOCOL}://${WS_HOST}`;

      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        this.socket.send(JSON.stringify({ type: "auth", userId }));
        this.connected = true;
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "notification") {
          const id = Date.now() + Math.random();
          this.notifications.unshift({
            id,
            message: data.message,
            time: data.time,
            read: false,
          });
          notification.success({
            message: "Sizga yangi xabar keldi",
          });
          this.playSound();
        }
      };

      this.socket.onclose = () => {
        this.connected = false;
      };
    },
    markAsRead(id) {
      const notif = this.notifications.find((n) => n.id === id);
      if (notif) notif.read = true;
    },
    playSound() {
      this.notifSound.currentTime = 0;
      this.notifSound.play().catch((e) => {
        console.log("Audio error", e);
      });
    },
  },
});

export default useNotification;
