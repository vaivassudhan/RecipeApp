package com.pstest.recipesapi;

import com.pstest.recipesapi.model.Recipe;
import com.pstest.recipesapi.repository.RecipeRepository;
import com.pstest.recipesapi.service.RecipeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RecipeServiceTest {

    @Mock
    private RecipeRepository recipeRepository;

    @InjectMocks
    private RecipeService recipeService;

    @Test
    public void testGetAllRecipes() {
        List<Recipe> expectedRecipes = List.of(new Recipe(), new Recipe());
        List<Recipe> actualRecipes = recipeService.getAllRecipes();

        assertEquals(expectedRecipes.size(), actualRecipes.size());
        verify(recipeRepository, times(1)).findAll();
    }

    @Test
    public void testGetRecipeById_ValidId() {
        Recipe expectedRecipe = new Recipe();
        when(recipeRepository.findById(1L)).thenReturn(Optional.of(expectedRecipe));

        Recipe actualRecipe = recipeService.getRecipeById(1L);

        assertEquals(expectedRecipe, actualRecipe);
        verify(recipeRepository, times(1)).findById(1L);
    }

    @Test
    public void testGetRecipeById_InvalidId() {
        when(recipeRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            recipeService.getRecipeById(1L);
        });

        assertEquals("Recipe not found with id: 1", exception.getMessage());
        verify(recipeRepository, times(1)).findById(1L);
    }
}