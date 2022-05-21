import axiosClient from "./axiosClient";

const userApi = {
    getAll: () => {
        const url = '/User';
        return axiosClient.get(url);
    }
}
export default userApi;