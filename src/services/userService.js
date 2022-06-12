import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

export async function login(userName, password) {
    const loginJson = {
        username: userName,
        password: password
    }
    // return 
    const response = await fetch(`${baseURL}/User/Login`, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginJson)
    });
    return response.json();
}
export async function singup(newUser) {
    const userEnum = {
        name: newUser.name,
        gender: newUser.sex,
        phone: newUser.phone,
        email: newUser.email,
        avata: newUser.avatar,
        username: newUser.userName,
        password: newUser.password,
        role: newUser.role ? newUser.role : 2
    }
    const response = await axios.post(`${baseURL}/User/CreateUser`, userEnum, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data
}
export async function edit(newUser, id, accessToken) {
    const userEnum = {
        name: newUser.name,
        gender: newUser.sex,
        phone: newUser.phone,
        email: newUser.email,
        avata: newUser.avatar,
        username: newUser.userName,
    }
    const response = await axios.put(`${baseURL}/User/EditAccount/${id}`, userEnum, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });
    return response.data
}
export async function getAllUser() {
    const response = await axios.get(`${baseURL}/User`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data
}

export async function getUserById(id) {
    const response = await axios.get(`${baseURL}/User/get/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = response.data
    if (data.result) {
        return data.data
    } else {
        return { name: "không tìm thấy!" }
    }
}


export async function createAuthorFavourite(idAuthor, idUser, accessToken) {
    const authorFavouriteEnum = {
        idAuthor,
        idUser
    }
    const response = await axios.post(`${baseURL}/AuthorFavorite/create`, authorFavouriteEnum, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });
    return response.data
}

export async function deleteAuthorFavourite(idUser, idAuthor, accessToken) {
    const response = await axios.delete(`${baseURL}/AuthorFavorite?id_use=${idUser}&id_author=${idAuthor}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });
    return response.data
}

export async function lockAccount(idUser, accessToken) {
    const response = await axios.delete(`${baseURL}/User/LockAccount/${idUser}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });
    return response.data
}
// export async function editRole(idAdmin, idUser, role, accessToken) {
//     const response = await axios.put(`${baseURL}/User/EditRole`, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + accessToken
//         }
//     });
//     return response.data
// }
export async function editRole(accessToken) {
    const response = await axios.put(`${baseURL}/User/EditRole`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })
    return response.data
}