package com.pstest.recipesapi.repository;

import com.pstest.recipesapi.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByNameContainingOrCuisineContaining(String name, String cuisine);
}
