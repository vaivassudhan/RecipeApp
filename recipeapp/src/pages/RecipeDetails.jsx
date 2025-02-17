import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../services/api";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";

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

  if (loading) return <Loader />;

  return (
    <div className="container my-5">
      <ErrorAlert message={error} />
      {!recipe && !error && <p className="text-center">No recipe found.</p>}
      {recipe && (
        <>
          <div className="row">
            <div className="col-md-6">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="img-fluid rounded shadow-lg"
              />
            </div>
            <div className="col-md-6">
              <h1 className="display-4 font-weight-bold">{recipe.name}</h1>
              <p className="text-muted">{recipe.cuisine}</p>

              <div className="d-flex align-items-center mb-3">
                <span className="text-warning h4 mr-2">★ {recipe.rating}</span>
                <span className="text-muted">({recipe.reviewCount} reviews)</span>
              </div>

              <div className="mb-4">
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="badge badge-secondary mr-2">
                    {tag}
                  </span>
                ))}
              </div>

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

              <div className="mb-4">
                <h5 className="text-muted">Difficulty</h5>
                <p className="h4">{recipe.difficulty}</p>
              </div>
            </div>
          </div>

          <div className="row mt-5">
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
        </>
      )}
    </div>
  );
}

export default RecipeDetails;