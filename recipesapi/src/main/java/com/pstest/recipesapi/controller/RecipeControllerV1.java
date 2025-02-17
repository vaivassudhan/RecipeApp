package com.pstest.recipesapi.controller;

import com.pstest.recipesapi.model.Recipe;
import com.pstest.recipesapi.service.RecipeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recipes")
@CrossOrigin(originPatterns = "http://localhost:*")
@Validated
@Tag(name = "Recipe Controller Version 1", description = "APIs for fetching and managing recipes")
public class RecipeControllerV1 {

    @Autowired
    private RecipeService recipeService;

    @Operation(summary = "Load recipe", description = "To load recipe into the database from third party API")
    @PostMapping("/load")
    public ResponseEntity<String> loadRecipes() {
        recipeService.loadRecipe();
    return ResponseEntity.ok("Loaded all the recipes data from the dataset to in-memory H2 DB");
    }

    @Operation(summary = "Get all recipes", description = "To list all available recipes")
    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes()
    {
        List<Recipe> recipes = recipeService.getAllRecipes();
        if (recipes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(recipes);
    }

    @Operation(summary = "Get recipe by ID", description = "To fetch a recipe using its ID")
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeDetailsByID(
            @PathVariable Long id
    )
    {
        return ResponseEntity.ok(recipeService.getRecipeById(id));
    }

    @Operation(summary = "Search recipes", description = "To search recipes by name or cuisine")
    @GetMapping("/search")
    public ResponseEntity<List<Recipe>> searchRecipes(
            @RequestParam @Valid @NotBlank(message = "Search text must not be blank") String searchText) {
        List<Recipe> recipes = recipeService.searchRecipes(searchText);
        return ResponseEntity.ok(recipes);
    }
}
