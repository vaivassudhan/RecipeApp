package com.pstest.recipesapi.service;

import com.pstest.recipesapi.exception.ResourceNotFoundException;
import com.pstest.recipesapi.model.Recipe;
import com.pstest.recipesapi.repository.RecipeRepository;
import jakarta.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;

@Service
@Slf4j
public class RecipeService {

  private final RecipeRepository recipeRepository;
  private final EntityManager entityManager;
  private final RecipeFetchService recipeFetchService;
  public RecipeService(RecipeRepository recipeRepository, EntityManager entityManager, RecipeFetchService recipeFetchService) {
    this.recipeRepository = recipeRepository;
    this.entityManager = entityManager;
    this.recipeFetchService = recipeFetchService;
  }

  private static final String[] SEARCHABLE_FIELDS = {"name", "cuisine"};

  public void loadRecipe() {
    List<Recipe> recipes = recipeFetchService.fetchRecipes().getRecipes();
    if(!recipes.isEmpty()) {
      saveRecipes(recipes);
    }
  }


  public List<Recipe> getAllRecipes() {
    return recipeRepository.findAll();
  }

  public Recipe getRecipeById(Long id) {
    return recipeRepository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with id: " + id));
  }

  public List<Recipe> searchRecipes(String searchText) {
    log.info("Searching recipes with query: {}", searchText);
    if (searchText.length() < 3) {
      log.info("Search text must have at least 3 characters but got {}", searchText.length());
      throw new IllegalArgumentException("Search text must have at least 3 characters");
    }

    SearchSession searchSession = Search.session(entityManager);
    List<Recipe> results = searchSession.search(Recipe.class)
            .where(f -> f.bool()
                    .should(f.wildcard().fields(SEARCHABLE_FIELDS).matching("*" + searchText + "*"))
                    .minimumShouldMatchNumber(1))
            .fetchHits(30);
    return new HashSet<>(results).stream().toList();
  }

  @Transactional
  public void saveRecipes(List<Recipe> recipes) {
    for (Recipe recipe : recipes) {
      recipeRepository.save(recipe);
    }
  }
}
