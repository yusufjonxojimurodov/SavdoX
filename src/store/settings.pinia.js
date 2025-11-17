import { defineStore } from "pinia";
import { ApiGetUserAvatar } from "@/api/settings.api";
import useRegister from "./register.pinia";
import api from "@/utils/api/api";
import { message } from "ant-design-vue";


const useSetting = defineStore("setting", {
  state: () => ({
    avatar: "",
    fileList: [],
    avatarHashId: "",
    avatarLoading: false,
  }),

  actions: {
    async getUserAvatar() {
      this.avatarLoading = true;
      try {
        const user = useRegister().user;
        const { data } = await ApiGetUserAvatar(user.avatar_content_type);

        this.avatar = `data:${user.avatar_content_type};base64,${data.avatar}`;
      } catch (error) {
        console.error("Profil olishda xato:", error);
        this.avatar = null;
      } finally {
        console.log(this.avatar);
        this.avatarLoading = false;
      }
    },

    setFileList(files) {
      this.fileList = files;
    },

    async uploadAvatar() {
      if (this.fileList.length === 0) {
        message.warning("Rasm tanlanmadi!");
        return;
      }

      this.uploadLoading = true;

      try {
        const formData = new FormData();
        formData.append("avatar", this.fileList[0].originFileObj);

        const res = await api({
          url: "/api/upload/avatar/upload",
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.avatarHashId = res.data.avatar;
      } catch (err) {
        console.error(err);
        message.error(err.response?.data?.message || err);
      } finally {
        console.log(this.avatarHashId);
        this.uploadLoading = false;
      }
    },
  },
});

export default useSetting;
