import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

export async function getAllCategory() {
    const response = await axios.get(`${baseURL}/Category`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data
}

export async function editCategory(id, accessToken, title) {
    const editTitleCategory = {
        title
    }
    const response = await axios.put(`${baseURL}/Category/EditCategory/${id}`, editTitleCategory, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });
    return response.data
}

export async function createCategory(accessToken, title) {
    const categoryEnum = {
        title
    }
    const response = await axios.post(`${baseURL}/Category/create`, categoryEnum, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });
    return response.data
}
export async function deleteCategory(id, accessToken) {
    const response = await axios.delete(`${baseURL}/Category?id_cat=${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });
    return response.data
}