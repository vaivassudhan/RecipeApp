import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Recipes from "./Recipes";
import { fetchRecipes, searchRecipes, loadRecipes } from "../services/api";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipeLoaded, setRecipeLoaded] = useState(false);

  useEffect(() => {
    console.log("HomePage useEffect called test");
    const loadInitialRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetchRecipes();
        if (response.status === 200) {
          setRecipes(response.data);
          setFilteredRecipes(response.data);
          setRecipeLoaded(true);
        } else if (response.status === 204) {
          setRecipeLoaded(false);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadInitialRecipes();
  }, []);


  const handleSearch = async (query) => {
    console.log("handleSearch called with query:", query);
    if (query.length >= 3) {
      setLoading(true);
      try {
        const data = await searchRecipes(query);
        console.log("Search results:", data);
        setFilteredRecipes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    } else {
      setFilteredRecipes(recipes);
    }
  };

 
  const handleLoadRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      await loadRecipes();
      const response = await fetchRecipes();
      if (response.status === 200) {
        setRecipes(response.data);
        setFilteredRecipes(response.data);
        setRecipeLoaded(true);
      } else if (response.status === 204) {
        setRecipeLoaded(false);
      }
      setLoading(false);
      console.log("Recipes loaded:", response.data);
    } catch (error) {
      console.error("Failed to load recipes:", error);
      setError("Failed to load recipes. Please try again.");
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto mt-4">
      <ErrorAlert message={error} />
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h1 className="text-center mb-4">Recipes</h1>
          <div className="d-flex justify-content-center mb-4">
            {(filteredRecipes.length === 0 && !recipeLoaded) && (
              <button className="btn btn-primary" onClick={handleLoadRecipes}>
                Load Recipes
              </button>
            )}
          </div>
          {(filteredRecipes.length != 0 || recipeLoaded) && (<SearchBar onSearch={handleSearch} />)}
          
          {loading && <Loader />}
          {error && <p>Error: {error}</p>}
          <Recipes recipes={filteredRecipes} setRecipes={setRecipes} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;