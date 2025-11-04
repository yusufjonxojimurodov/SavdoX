import { defineStore } from "pinia";

export const useNotification = defineStore("notification", {
  state: () => ({
    notifications: [],
    socket: null,
    connected: false,
  }),
  actions: {
    connectWebSocket(userId) {
      if (this.connected) return;

      this.socket = new WebSocket(`ws://192.168.0.194:5000?userId=${userId}`);

      this.socket.onopen = () => {
        console.log("Websocket success");
        this.connected = true;
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "notification") {
          // ID yaratish, agar backend bermasa
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
