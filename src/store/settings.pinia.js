import { defineStore } from "pinia";
import { ApiGetUserAvatar, ApiPostAvatar } from "../api/settings.api";
import { message } from "ant-design-vue";

const useSetting = defineStore("setting", {
  state: () => ({
    avatar: [],
    avatarLoading: false,
  }),

  actions: {
    postUserAvatar(image) {
      this.avatarLoading = true;

      ApiPostAvatar(image)
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

    getUserAvatar() {
      this.avatarLoading = true;

      ApiGetUserAvatar()
        .then(({ data }) => {
          this.avatar = data.avatar;
        })
        .catch((error) => {
          message.error("Profil olishda xato" + error);
        })
        .finally(() => {
          this.avatarLoading = false;
        });
    },
  },
});

export default useSetting