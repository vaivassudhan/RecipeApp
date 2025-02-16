import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Recipes = ({ recipes = [] }) => {
  const navigate = useNavigate();

  if (!recipes.length) return <p>No recipes found.</p>;

  return (
    <div className="row justify-content-center">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="col-md-4 mb-4"
          onClick={() => navigate(`/recipe/${recipe.id}`)}
        >
          <div className="card h-100">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="card-img-top img-fluid"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{recipe.name}</h5>
              <p className="card-text">{recipe.cuisine}</p>
              <p className="card-text">
                <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      cuisine: PropTypes.string.isRequired,
      ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
};

export default Recipes;