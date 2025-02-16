import axios from "axios";
import { API_BASE_URL } from "../config/env";

export const fetchRecipes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/recipes`);
        console.log("testing" + response)
        return response.data;
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
        throw new Error("Failed to fetch recipe by ID");
    }
};
