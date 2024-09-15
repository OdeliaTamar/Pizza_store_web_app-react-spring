package sk;

import java.util.List;

/**
 * Represents an order with customer details and a list of pizzas.
 */
public class Order {
    /**
     * The unique identifier of the order.
     */
    private Long id;

    /**
     * The first name of the customer.
     */
    private String firstName;

    /**
     * The last name of the customer.
     */
    private String lastName;

    /**
     * The street address of the customer.
     */
    private String street;

    /**
     * The house number of the customer's address.
     */
    private String houseNumber;

    /**
     * The city of the customer's address.
     */
    private String city;

    /**
     * The phone number of the customer.
     */
    private String phone;

    /**
     * The list of pizzas in the order.
     */
    private List<Pizza> pizzas;

    /**
     * Constructs a new Order with the specified details and list of pizzas.
     *
     * @param id           the unique identifier of the order
     * @param firstName    the first name of the customer
     * @param lastName     the last name of the customer
     * @param street       the street address of the customer
     * @param houseNumber  the house number of the customer's address
     * @param city         the city of the customer's address
     * @param phone        the phone number of the customer
     * @param pizzas       the list of pizzas in the order
     */
    public Order(Long id, String firstName, String lastName, String street, String houseNumber, String city, String phone, List<Pizza> pizzas) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.street = street;
        this.houseNumber = houseNumber;
        this.city = city;
        this.phone = phone;
        this.pizzas = pizzas;
    }

    /**
     * Gets the unique identifier of the order.
     *
     * @return the id of the order
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the unique identifier of the order.
     *
     * @param id the new id of the order
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Gets the first name of the customer.
     *
     * @return the first name of the customer
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Sets the first name of the customer.
     *
     * @param firstName the new first name of the customer
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Gets the last name of the customer.
     *
     * @return the last name of the customer
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Sets the last name of the customer.
     *
     * @param lastName the new last name of the customer
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    /**
     * Gets the street address of the customer.
     *
     * @return the street address of the customer
     */
    public String getStreet() {
        return street;
    }

    /**
     * Sets the street address of the customer.
     *
     * @param street the new street address of the customer
     */
    public void setStreet(String street) {
        this.street = street;
    }

    /**
     * Gets the house number of the customer's address.
     *
     * @return the house number of the customer's address
     */
    public String getHouseNumber() {
        return houseNumber;
    }

    /**
     * Sets the house number of the customer's address.
     *
     * @param houseNumber the new house number of the customer's address
     */
    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    /**
     * Gets the city of the customer's address.
     *
     * @return the city of the customer's address
     */
    public String getCity() {
        return city;
    }

    /**
     * Sets the city of the customer's address.
     *
     * @param city the new city of the customer's address
     */
    public void setCity(String city) {
        this.city = city;
    }

    /**
     * Gets the phone number of the customer.
     *
     * @return the phone number of the customer
     */
    public String getPhone() {
        return phone;
    }

    /**
     * Sets the phone number of the customer.
     *
     * @param phone the new phone number of the customer
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }

    /**
     * Gets the list of pizzas in the order.
     *
     * @return the list of pizzas in the order
     */
    public List<Pizza> getPizzas() {
        return pizzas;
    }

    /**
     * Sets the list of pizzas in the order.
     *
     * @param pizzas the new list of pizzas in the order
     */
    public void setPizzas(List<Pizza> pizzas) {
        this.pizzas = pizzas;
    }
}
