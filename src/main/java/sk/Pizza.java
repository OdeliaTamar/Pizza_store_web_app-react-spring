package sk;

import java.util.List;

/**
 * Represents a pizza with a list of ingredients.
 */
public class Pizza {
    /**
     * The list of ingredients for the pizza.
     */
    private List<String> ingredients;

    /**
     * Default constructor for creating an empty Pizza.
     */
    public Pizza() {
    }
    /**
     * Constructs a Pizza with the specified list of ingredients.
     *
     * @param ingredients the list of ingredients for the pizza
     */
    public Pizza(List<String> ingredients) {
        this.ingredients = ingredients;
    }
    /**
     * Gets the list of ingredients for the pizza.
     *
     * @return the list of ingredients
     */
    public List<String> getIngredients() {
        return ingredients;
    }
    /**
     * Sets the list of ingredients for the pizza.
     *
     * @param ingredients the new list of ingredients
     */
    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }
}

