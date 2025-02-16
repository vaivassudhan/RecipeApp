import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Recipes from "./Recipes";
import { fetchRecipes, searchRecipes } from "../services/api";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("HomePage useEffect called");
    const loadRecipes = async () => {
      setLoading(true);
      try {
        const data = await fetchRecipes();
        setRecipes(data);
        setFilteredRecipes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadRecipes();
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

  return (
    <div className="container mx-auto mt-4">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h1 className="text-center mb-4">Recipes</h1>
          <SearchBar onSearch={handleSearch} />
          {loading && <p>Loading recipes...</p>}
          {error && <p>Error: {error}</p>}
          <Recipes recipes={filteredRecipes} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;