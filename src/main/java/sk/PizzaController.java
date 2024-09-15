package sk;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.HashSet;
import java.util.Set;

/**
 * Controller class responsible for handling pizza-related API endpoints.
 */
@RestController
@RequestMapping("/api")
public class PizzaController {
    private List<Ingredient> ingredients = new ArrayList<>();
    private List<Order> orders = new ArrayList<>();
    private Set<Long> orderIds = new HashSet<>();
    /**
     * Initializes the PizzaController with some default ingredients.
     */
    public PizzaController() {
        ingredients.add(new Ingredient(1, "Extra Cheese", "/images/cheese.png"));
        ingredients.add(new Ingredient(2, "Black Olives", "/images/olive.png"));
        ingredients.add(new Ingredient(3, "Mushrooms", "/images/mashroom.png"));
        ingredients.add(new Ingredient(4, "Tomato", "/images/tomato.png"));
        ingredients.add(new Ingredient(5, "Tuna", "/images/tuna.png"));
        ingredients.add(new Ingredient(6, "Red Pepper", "/images/redPepper.png"));
        ingredients.add(new Ingredient(7, "Green Pepper", "/images/greenPepper.png"));
    }
    /**
     * Retrieves the list of available ingredients.
     *
     * @return the list of ingredients
     */
    @GetMapping("/ingredients")
    public List<Ingredient> getIngredients() {
        return ingredients;
    }
    /**
     * Places an order for pizzas.
     *
     * @param order the order details
     * @return the order with assigned ID
     */
    @PostMapping("/orders")
    public synchronized Order placeOrder(@RequestBody Order order) {
        long newOrderId;
        do {
            newOrderId = ThreadLocalRandom.current().nextLong(100000, 1000000); // 6 ספרות
        } while (orderIds.contains(newOrderId));

        order.setId(newOrderId);
        orders.add(order);
        orderIds.add(newOrderId);
        return order;
    }

    /**
     * Retrieves the order details for a specific order ID.
     *
     * @param id the ID of the order to retrieve
     * @return the order details, or null if not found
     */
    @GetMapping("/orders/{id}")
    public synchronized Order getOrder(@PathVariable Long id) {
        return orders.stream()
                .filter(order -> order.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}
