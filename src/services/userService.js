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
        role: 2
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
