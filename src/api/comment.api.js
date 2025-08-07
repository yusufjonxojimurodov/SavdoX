import { api } from "../utils/api/api";

export function ApiGetComments(id) {
    return api({
        url: `/api/comments/${id}`,
        method: 'GET'
    })
}

export function ApiCreateComment(form) {
    return api({
        url: "/api/comments/create/comment",
        method: 'POST',
        data: form
    })
}

export function ApiDeleteComment(id) {
    return api({
        url: `/api/comments/delete/${id}`,
        method: 'DELETE',
    })
}