import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

export async function getAllCommentByArticle(idArticle) {
    const response = await axios.get(`${baseURL}/Comment?id_articles=${idArticle}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data
}

export async function createComment(idUser, idArticles, comment, accessToken) {
    const commentEnum = {
        idUser,
        idArticles,
        contentComment: comment
    }
    const response = await axios.post(`${baseURL}/Comment/create`, commentEnum, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });
    return response.data
}
export async function editComment(id, comment, accessToken) {
    const commentEnum = {
        contentComment: comment
    }
    const response = await axios.put(`${baseURL}/Comment/Edit/${id}`, commentEnum, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });
    return response.data
}
export async function deleteComment(id, accessToken) {
    const response = await axios.delete(`${baseURL}/Comment/delete?id_cmt=${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });
    return response.data
}