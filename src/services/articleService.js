import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

export async function getAllArticles() {
    const response = await axios.get(`${baseURL}/Articles`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data
}
export async function getArticleById(id) {
    const response = await axios.get(`${baseURL}/Articles/get/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data
}
export async function createArticle(idUser, article, accessToken) {
    const articleEnum = {
        title: article.title,
        contentArticles: article.contentArticles,
        idUser: idUser,
        status: "hoàn thành",
        image: article.image
    }
    const response = await axios.post(`${baseURL}/Articles/create`, articleEnum, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });
    return response.data
}

export async function editArticle(article, id, accessToken) {
    const articleEnum = {
        title: article.title,
        contentArticles: article.contentArticles,
        status: "Đã hoàn thành",
        image: article.image
    }
    const response = await axios.put(`${baseURL}/Articles/Edit/${id}`, articleEnum, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });
    return response.data
}

export async function deleteArticle(id, accessToken) {
    const response = await axios.delete(`${baseURL}/Articles`, {
        params: {
            id_art: id
        }
    }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });
    return response.data
}

// export async function deleteArticle(id, accessToken) {
//     const response = await fetch(`${baseURL}/Articles?id_art=${id}`, {
//         method: 'DELETE',
//         mode: 'cors',
//         cache: 'no-cache',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + accessToken,
//             'Access-Control-Allow-Origin': '*',
//         }
//     });

//     return response
// }