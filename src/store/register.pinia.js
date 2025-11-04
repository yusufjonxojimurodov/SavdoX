import { defineStore } from "pinia";
import {
  ApiGetComplaint,
  ApiGetUserInfo,
  ApiLoginFace,
  ApiLoginUser,
  ApiPutUserInfo,
} from "../api/user.api";
import { message, notification } from "ant-design-vue";
import api from "../utils/api/api";

const useRegister = defineStore("register", {
  state: () => ({
    user: "",
    platformStatus: {},
    complaint: [],
    loader: false,
    drawerOpen: false,
    modalOpen: false,
    botModalOpen: false,
    loaderButton: false,
    faceLoginBtn: false,
    drawerMode: "register",
    userLoader: false,
  }),

  actions: {
    closeModal() {
      this.modalOpen = false;
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

    async loginUser(form) {
      this.loaderButton = true;
      try {
        const { data } = await ApiLoginUser(form);
        if (data.role === "blocked") {
          notification.error({
            message: "Ruxsat berilmadi",
            description:
              "Siz platformada bloklangansiz. Agarda tizim xatosi deb o'ylasangiz adminlarga murojaat qiling !",
          });
          return;
        }
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

    async palmLogin(form) {
      this.faceLoginBtn = true;
      try {
        const formData = new FormData();
        formData.append("phone", form.phone);

        if (form.face) {
          const byteString = atob(form.face.split(",")[1]);
          const mimeString = form.face
            .split(",")[0]
            .split(":")[1]
            .split(";")[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
          formData.append("face", blob, "face.png");
        }

        const { data } = await ApiLoginFace(formData);

        if (data.role === "blocked") {
          notification.error({
            message: "Ruxsat berilmadi",
            description:
              "Siz platformada bloklangansiz. Agarda tizim xatosi deb o'ylasangiz adminlarga murojaat qiling !",
          });
          return false;
        }

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
        this.faceLoginBtn = false;
      }
    },

    async userInfo() {
      this.userLoader = true;
      try {
        const { data } = await ApiGetUserInfo();
        this.user = data;

        return true;
      } catch (errorGet) {
        return false;
      } finally {
        this.userLoader = false;
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

    async getComplaint() {
      this.loader = true;

      return ApiGetComplaint()
        .then(({ data }) => {
          this.complaint = data.complaints;
        })
        .catch((getErr) => {
          message.warn("Server bilan xatolik yuzaga keldi");
          console.log(getErr);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    getPlatformStatus() {
      this.loader = true;
      api({
        url: "/api/website/get/platform/status",
        method: "GET",
      })
        .then(({ data }) => {
          this.platformStatus = data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
  },
});

export default useRegister;
