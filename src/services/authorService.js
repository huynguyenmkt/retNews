import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

export async function getAuthorFavorite(accessToken) {
    const response = await axios.get(`${baseURL}/AuthorFavorite`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });
    // console.log(response)
    const data = await response.data
    // console.log(data)
    return data
}

