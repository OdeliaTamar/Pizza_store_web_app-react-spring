package sk;
/**
 * Represents an ingredient with an id, name, and image.
 */
public class Ingredient
{
    /**
     * The unique identifier of the ingredient.
     */
    private int id;

    /**
     * The name of the ingredient.
     */
    private String name;

    /**
     * The image URL of the ingredient.
     */
    private String image;

    /**
     * Constructs a new Ingredient with the specified id, name, and image.
     *
     * @param id    the unique identifier of the ingredient
     * @param name  the name of the ingredient
     * @param image the image URL of the ingredient
     */
    public Ingredient(int id, String name, String image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }


    /**
     * Gets the id of the ingredient.
     *
     * @return the id of the ingredient
     */
    public int getId() {
        return id;
    }

    /**
     * Sets the id of the ingredient.
     *
     * @param id the new id of the ingredient
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Gets the name of the ingredient.
     *
     * @return the name of the ingredient
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the ingredient.
     *
     * @param name the new name of the ingredient
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the image URL of the ingredient.
     *
     * @return the image URL of the ingredient
     */
    public String getImage() {
        return image;
    }

    /**
     * Sets the image URL of the ingredient.
     *
     * @param image the new image URL of the ingredient
     */
    public void setImage(String image) {
        this.image = image;
    }
}
