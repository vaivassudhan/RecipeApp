import axios from "axios";
import { API_BASE_URL } from "../config/env";

export const fetchRecipes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/recipes`);
        console.log("testing fetchRecipes response ", response);
        return { status: response.status, data: response.data };
    } catch (error) {
        throw new Error("Failed to fetch recipes");
    }
};

export const searchRecipes = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/recipes/search?searchText=${query}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to search recipes");
    }
};

export const fetchRecipeById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/recipes/${id}`);
        return response.data;
    } catch (error) {
        if(error.response.status === 404) {
            throw new Error(error.response.data);
        }
        else {
            throw new Error("Failed to fetch recipe");
        }
    }
};

export const loadRecipes = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/recipes/load`);
        console.log("testing in api.js loaded" + response)
        return response.data;
    } catch (error) {
        console.log(error.response)
        throw new Error("Failed to load recipes");
    }
};
