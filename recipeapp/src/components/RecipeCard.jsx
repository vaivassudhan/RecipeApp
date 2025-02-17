import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="card-img-top"
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{recipe.name}</h5>
          <p className="card-text text-muted">{recipe.cuisine}</p>
          <Link to={`/recipe/${recipe.id}`} className="btn btn-primary mt-auto">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
