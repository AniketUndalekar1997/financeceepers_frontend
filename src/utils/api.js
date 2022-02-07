import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const regiserApi = ({ name, email, password }) => {
    const url = '/register';
    const data = {
        name,
        email,
        password
    }

    return axiosInstance.post(url, data);
}

export const loginApi = ({ email, password }) => {
    const url = "/login";
    const data = {
        email,
        password
    }

    return axiosInstance.post(url, data, { withCredentials: true });
}

export const logoutApi = (() => {
    const url = "/logout";

    return axiosInstance.get(url, { withCredentials: true });
})

export const userApi = (() => {
    const url = "/user";
    return axiosInstance.get(url, { withCredentials: true });
})


export const fileUploadApi = ({ formData, config }) => {
    const url = "/upload";
    const data = {
        formData,
    }
    return axiosInstance.put(url, data, config);
}