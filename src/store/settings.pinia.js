import { defineStore } from "pinia";
import {
  ApiGetUserAvatar,
  ApiPostAvatar,
  ApiPostBanner,
} from "../api/settings.api";
import { message } from "ant-design-vue";

const useSetting = defineStore("setting", {
  state: () => ({
    avatar: [],
    avatarLoading: false,
  }),

  actions: {
    async postUserAvatar(image) {
      this.avatarLoading = true;

      return ApiPostAvatar(image)
        .then(() => {
          message.success("Avatar Qoyildi");
        })
        .catch((error) => {
          message.error("xato" + error);
        })
        .finally(() => {
          this.avatarLoading = false;
        });
    },

    async getUserAvatar() {
      this.avatarLoading = true;

      return ApiGetUserAvatar()
        .then(({ data }) => {
          this.avatar = data.avatarUrl;
        })
        .catch((error) => {
          console.log("Profil olishda xato" + error);
        })
        .finally(() => {
          this.avatarLoading = false;
        });
    },

    createBanner(form) {
      ApiPostBanner(form)
        .then(() => {
          message.success("Banner qoyld");
        })
        .catch((err) => {
          message.error("Banner Qoyilmadi", err);
        });
    },
  },
});

export default useSetting;
