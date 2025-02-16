import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../services/api";

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                const data = await fetchRecipeById(id);
                setRecipe(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        loadRecipe();
    }, [id]);

    if (loading) return <p>Loading recipe...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!recipe) return <p>No recipe found.</p>;

    // return (
    //     <div className="container mt-4 mb-4">
    //         <div className="row">
    //             <div className="col-md-6">
    //                 <img
    //                     src={recipe.image}
    //                     alt={recipe.name}
    //                     className="img-fluid rounded mb-4 shadow"
    //                 />
    //             </div>
    //             <div className="col-md-6">
    //                 <h1 className="mb-3">{recipe.name}</h1>
    //                 <p className="text-muted">{recipe.cuisine}</p>
    //                 <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
    //                 <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes</p>
    //                 <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes</p>
    //                 <p><strong>Servings:</strong> {recipe.servings}</p>
    //                 <p><strong>Calories per Serving:</strong> {recipe.caloriesPerServing}</p>
    //                 <p><strong>Rating:</strong> {recipe.rating} ({recipe.reviewCount} reviews)</p>
    //                 <p><strong>Tags:</strong> {recipe.tags.join(', ')}</p>
    //                 <p><strong>Meal Type:</strong> {recipe.mealType.join(', ')}</p>
    //             </div>
    //         </div>
    //         <div className="row mt-4">
    //             <div className="col-md-12">
    //                 <h3>Ingredients</h3>
    //                 <ul className="list-group">
    //                     {recipe.ingredients.map((ingredient, index) => (
    //                         <li key={index} className="list-group-item">{ingredient}</li>
    //                     ))}
    //                 </ul>
    //             </div>
    //         </div>
    //         <div className="row mt-4">
    //             <div className="col-md-12">
    //                 <h3>Instructions</h3>
    //                 <ol className="list-group list-group-numbered">
    //                     {recipe.instructions.map((instruction, index) => (
    //                         <li key={index} className="list-group-item">{instruction}</li>
    //                     ))}
    //                 </ol>
    //             </div>
    //         </div>
    //     </div>
    // );
  return (
    <div className="container my-5">
      <div className="row">
        {/* Recipe Image */}
        <div className="col-md-6">
          <img
            src={recipe.image || "https://via.placeholder.com/500"}
            alt={recipe.name}
            className="img-fluid rounded shadow-lg"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/500";
            }}
          />
        </div>

        {/* Recipe Details */}
        <div className="col-md-6">
          <h1 className="display-4 font-weight-bold">{recipe.name}</h1>
          <p className="text-muted">{recipe.cuisine}</p>

          {/* Rating and Reviews */}
          <div className="d-flex align-items-center mb-3">
            <span className="text-warning h4 mr-2">★ {recipe.rating}</span>
            <span className="text-muted">({recipe.reviewCount} reviews)</span>
          </div>

          {/* Tags */}
          <div className="mb-4">
            {recipe.tags.map((tag, index) => (
              <span key={index} className="badge badge-secondary mr-2">
                {tag}
              </span>
            ))}
          </div>

          {/* Prep and Cook Time */}
          <div className="row mb-4">
            <div className="col-6">
              <h5 className="text-muted">Prep Time</h5>
              <p className="h4">{recipe.prepTimeMinutes} mins</p>
            </div>
            <div className="col-6">
              <h5 className="text-muted">Cook Time</h5>
              <p className="h4">{recipe.cookTimeMinutes} mins</p>
            </div>
          </div>

          {/* Servings and Calories */}
          <div className="row mb-4">
            <div className="col-6">
              <h5 className="text-muted">Servings</h5>
              <p className="h4">{recipe.servings}</p>
            </div>
            <div className="col-6">
              <h5 className="text-muted">Calories</h5>
              <p className="h4">{recipe.caloriesPerServing} kcal</p>
            </div>
          </div>

          {/* Difficulty */}
          <div className="mb-4">
            <h5 className="text-muted">Difficulty</h5>
            <p className="h4">{recipe.difficulty}</p>
          </div>
        </div>
      </div>

      {/* Ingredients and Instructions */}
      <div className="row mt-5">
        {/* Ingredients */}
        <div className="col-md-6">
          <h3 className="mb-4">Ingredients</h3>
          <ul className="list-group">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="list-group-item">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="col-md-6">
          <h3 className="mb-4">Instructions</h3>
          <ol className="list-group">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="list-group-item">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;