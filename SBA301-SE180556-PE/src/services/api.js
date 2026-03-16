import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAllCategories = () => {
    return axiosInstance.get("api/categories");
};

export const searchShoes = (name = "", category = "", page = 0, size = 5) => {
    return axiosInstance.get("api/shoes/search", {
        params: {
            name: name || undefined,
            category: category || undefined,
            page,
            size,
        },
    });
};

export const getShoesById = (id) => {
    return axiosInstance.get(`/api/shoes/${id}`);
};

export const createShoes = (shoeData) => {
    return axiosInstance.post("/api/shoes", shoeData);
};

export const deleteShoes = (id) => {
    return axiosInstance.delete(`/api/shoes/${id}`);
};
