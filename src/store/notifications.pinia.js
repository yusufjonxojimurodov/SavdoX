import { defineStore } from "pinia";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const WS_PROTOCOL = SERVER_URL.startsWith("https") ? "wss" : "ws";
const WS_HOST = SERVER_URL.replace(/^https?:\/\//, "");

export const useNotification = defineStore("notification", {
  state: () => ({
    notifications: [],
    socket: null,
    connected: false,
  }),
  actions: {
    connectWebSocket(userId) {
      if (this.connected) return;

      const url = `${WS_PROTOCOL}://${WS_HOST}?userId=${userId}`;
      console.log("Connecting to WebSocket:", url);

      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        console.log("Websocket success");
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
        }
      };

      this.socket.onclose = () => {
        console.log("Websocket finished");
        this.connected = false;
      };
    },
    markAsRead(id) {
      const notif = this.notifications.find((n) => n.id === id);
      if (notif) notif.read = true;
    },
  },
});

export default useNotification;
