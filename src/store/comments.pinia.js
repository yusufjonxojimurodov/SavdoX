import { defineStore } from "pinia";
import {
  ApiCreateComment,
  ApiDeleteComment,
  ApiGetComments,
} from "../api/comment.api";
import { message } from "ant-design-vue";

const useComments = defineStore("comment", {
  state: () => ({
    comments: [],
    loader: false,
    createLoader: false,
  }),

  actions: {
    getComments(id) {
      this.loader = false;

      ApiGetComments(id)
        .then(({ data }) => {
          this.comments = data;
          this.loader = true;
        })
        .catch((getErr) => {
          const errorMessage =
            getErr.data?.response?.message || "Server xatosi";
          message.error(errorMessage);
        })
        .finally(() => {
          this.loader = false;
        });
    },

    createComment(form) {
      this.createLoader = true;

      ApiCreateComment(form)
        .then(({ data }) => {
          message.success("Mahsulotimiz haqida fikringiz uchun raxmat !");
          this.comments.unshift(data);
        })
        .catch((createErr) => {
          const errorMessage =
            createErr.data?.response?.message || "Server xatosi";
          message.error(errorMessage);
        })
        .finally(() => {
          this.createLoader = false;
        });
    },

    deleteComment(id) {
      this.loader = true;

      ApiDeleteComment(id)
        .then(() => {
          message.success("Fikringiz o'chirildi");
          this.comments = this.comments.filter((com) => com._id !== id);
        })
        .catch((delErr) => {
          const errorMessage =
            delErr.data?.response?.message || "Server Xatosi";
          message.error(errorMessage);
        })
        .finally(() => {
          this.loader = false;
        });
    },
  },
});

export default useComments;