package com.pstest.recipesapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;

import java.util.List;


@Data
@Entity
@Indexed
public class Recipe {

    @Id
    @JsonProperty("id")
    private Long id;

    @FullTextField
    @JsonProperty("name")
    private String name;

    @JsonProperty("ingredients")
    @ElementCollection
    private List<String> ingredients;

    @JsonProperty("instructions")
    @ElementCollection
    private List<String> instructions;

    @JsonProperty("prepTimeMinutes")
    private int prepTimeMinutes;

    @JsonProperty("cookTimeMinutes")
    private int cookTimeMinutes;

    @JsonProperty("servings")
    private int servings;

    @JsonProperty("difficulty")
    private String difficulty;

    @FullTextField
    @JsonProperty("cuisine")
    private String cuisine;

    @JsonProperty("caloriesPerServing")
    private int caloriesPerServing;

    @JsonProperty("tags")
    @ElementCollection
    private List<String> tags;

    @JsonProperty("userId")
    private Long userId;

    @JsonProperty("image")
    private String image;

    @JsonProperty("rating")
    private double rating;

    @JsonProperty("reviewCount")
    private int reviewCount;

    @JsonProperty("mealType")
    @ElementCollection
    private List<String> mealType;
}
