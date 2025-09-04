import { defineStore } from "pinia";
import {
  ApiGetUserInfo,
  ApiLoginUser,
  ApiPutUserInfo,
  ApiRegisterUser,
} from "../api/user.api";
import { message } from "ant-design-vue";

const useRegister = defineStore("register", {
  state: () => ({
    user: "",
    loader: false,
    drawerOpen: false,
    modalOpen: false,
    botModalOpen: false,
    loaderButton: false,
    drawerMode: "register",
  }),

  actions: {
    closeModal() {
      this.modalOpen = false;
    },
    openRegister() {
      console.log("openRegister ishladi");
      this.drawerMode = "register";
      this.drawerOpen = true;
    },
    openLogin() {
      this.drawerMode = "login";
      this.drawerOpen = true;
    },
    openModal() {
      this.modalOpen = true;
    },
    openDrawer() {
      this.drawerOpen = true;
    },
    closeDrawer() {
      this.drawerOpen = false;
    },
    async registerUser(form) {
      this.loaderButton = true;
      try {
        const { data } = await ApiRegisterUser(form);
        localStorage.setItem("access_token", data.token);
        message.success("Ro'yxatdan muvaffaqiyatli o'tildi", 5);
        return true;
      } catch (error) {
        const status = error.response?.status;
        const errorMessage =
          error.response?.data?.message ||
          "Ro'yxatdan o'tishda xatolik yuz berdi !";
        message.error(errorMessage);

        if (status === 400) {
          this.botModalOpen = true;

          setTimeout(() => {
            this.botModalOpen = false;
          }, 3000);
        }
        return false;
      } finally {
        this.loaderButton = false;
      }
    },

    async loginUser(form) {
      this.loaderButton = true;
      try {
        const { data } = await ApiLoginUser(form);
        localStorage.setItem("access_token", data.token);
        message.success("Tizimga Kirish muvaffaqiyatli bajarildi");
        return true;
      } catch (error) {
        const errorMessage =
          error.response?.data.message ||
          "Tizimga kirishda xatolik yuz berdi !";
        message.error(errorMessage);
        return false;
      } finally {
        this.loaderButton = false;
      }
    },

    async userInfo() {
      this.loader = true;
      try {
        const { data } = await ApiGetUserInfo();
        this.user = data;
        return true;
      } catch (errorGet) {
        return false;
      } finally {
        this.loader = false;
      }
    },

    async putUserInfo(form) {
      this.loaderButton = true;

      return ApiPutUserInfo(form)
        .then(() => {
          message.success("Ma'lumotlar Yangilandi");
        })
        .catch((putError) => {
          message.error(putError);
        })
        .finally(() => {
          this.loaderButton = false;
        });
    },
  },
});

export default useRegister;
