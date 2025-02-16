package com.pstest.recipesapi.service;

import com.pstest.recipesapi.model.RecipeResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class RecipeFetchService {

  private static final String RECIPES_API_ENDPOINT = "/recipes";
  private final WebClient webClient;

  public RecipeFetchService(WebClient webClient) {
    this.webClient = webClient;
  }

  public RecipeResponse fetchRecipes() {
    return webClient
        .get()
        .uri(RECIPES_API_ENDPOINT)
        .retrieve()
        .bodyToMono(RecipeResponse.class)
        .block();
  }
}
