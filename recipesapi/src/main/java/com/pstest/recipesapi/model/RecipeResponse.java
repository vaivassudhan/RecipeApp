package com.pstest.recipesapi.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Data
public class RecipeResponse {
    private List<Recipe> recipes;
}
