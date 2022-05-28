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

export async function getAllUser() {
    const response = await axios.get(`${baseURL}/User`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data
}