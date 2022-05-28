import axiosClient from "./axiosClient";

const userApi = {
    getAll: () => {
        const url = '/User';
        return axiosClient.get(url);
    },
    login: (user) => {
        const url = "/User/Login";
        return axiosClient.post(url,)
    }
}
export default userApi;