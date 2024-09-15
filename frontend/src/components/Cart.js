import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import { Card, Button, Alert, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

/**
 * the cart componnent
 * @returns {Element}
 * @constructor
 */
const Cart = () => {
    const { state, dispatch } = useContext(CartContext);     // Extract state and dispatch function from CartContext
    const [ingredients, setIngredients] = useState([]);    // State to hold ingredient data
    const [errorMessage, setErrorMessage] = useState('');     // State to hold error messages
    const [orderDetails, setOrderDetails] = useState(null);    // State to hold order details after saving an order
    // State to control visibility of modals
    const [showModal, setShowModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const navigate = useNavigate();     // Hook to programmatically navigate

    // Fetch ingredients from API when the component mounts
    useEffect(() => {
        fetch('/api/ingredients')
            .then(response => response.json())
            .then(data => setIngredients(data));
    }, []);

    // Calculate the price of a pizza based on its ingredients
    const calculatePizzaPrice = (pizza) => {
        const basePrice = 10;
        const ingredientsPrice = pizza.ingredients.length * 1.5;
        return basePrice + ingredientsPrice;
    };

    // Dispatch action to remove a pizza from the cart
    const removePizza = index => {
        dispatch({ type: 'REMOVE_PIZZA', payload: index });
    };

    // Handle saving the order
    const handleSaveOrder = () => {
        // Check if the cart is empty
        if (state.cart.length === 0) {
            setErrorMessage('Your cart is empty. Please add pizzas to your cart before saving your order.');
            return;
        }
        // Retrieve user details from cookies
        const storedUserDetailsJSON = Cookies.get('userDetails');
        if (!storedUserDetailsJSON) {
            setShowModal(true);
            return;
        }
        // If user details are missing, show the modal
        const userDetails = JSON.parse(storedUserDetailsJSON);
        // Create the order object
        const order = {
            ...userDetails,
            pizzas: state.cart
        };
        // Send the order to the server
        fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(response => response.json())
            .then(data => {
                // Set order details and clear any previous error message
                setOrderDetails(data);
                setErrorMessage('');
                setShowOrderModal(true); // Show the order confirmation modal
                dispatch({ type: 'CLEAR_CART' });// Dispatch action to clear the cart
            })
            .catch(() => {
                // Set error message if there's an error saving the order
                setErrorMessage('There was an error saving your order.');
                setShowOrderModal(false);
            });
    };
    // Close the modals
    const handleCloseModal = () => setShowModal(false);
    const handleCloseOrderModal = () => setShowOrderModal(false);

    // Retrieve ingredient data by ID
    const getIngredientData = (id) => {
        return ingredients.find(ingredient => ingredient.id.toString() === id);
    };

    // Navigate to the edit pizza page
    const handleEditPizza = (index) => {
        navigate('/', { state: { pizzaIndex: index } });
    };

    return (
        <div className="container mt-5 mergin">
            <h1>Cart</h1>
            {state.cart.map((pizza, index) => (
                <Card key={index} className="mb-3">
                    <Card.Body>
                        <Card.Title>Pizza {index + 1}</Card.Title>
                        <Card.Text>Ingredients:</Card.Text>
                        <div className="d-flex flex-wrap">
                            {pizza.ingredients.map((ingredient, i) => {
                                const ingredientData = getIngredientData(ingredient);
                                return ingredientData ? (
                                    <img
                                        key={i}
                                        src={ingredientData.image}
                                        alt={ingredientData.name}
                                        style={{width: '50px', marginRight: '5px', marginBottom: '5px'}}
                                    />
                                ) : null;
                            })}
                        </div>
                        <Card.Text>Price: ${calculatePizzaPrice(pizza).toFixed(2)}</Card.Text>
                        <Button variant="outline-danger" onClick={() => removePizza(index)}>Remove</Button>
                        <Button variant="outline-warning" onClick={() => handleEditPizza(index)}
                                className="ml-2">Edit</Button>
                    </Card.Body>
                </Card>
            ))}
            <h4>Total Price:
                ${state.cart.reduce((total, pizza) => total + calculatePizzaPrice(pizza), 0).toFixed(2)}</h4>
            <br/>
            <Button variant="outline-warning" onClick={handleSaveOrder}>Save Order</Button><br/> <br/>
            {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Missing Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please fill out your details before saving your order.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" as={Link} to="/">Go to Home</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showOrderModal} onHide={handleCloseOrderModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {orderDetails && (
                        <div>
                            <p><strong>Order Code:</strong> {orderDetails.id}</p>
                            <p><strong>Name:</strong> {orderDetails.firstName} {orderDetails.lastName}</p>
                            <p>
                                <strong>Address:</strong> {orderDetails.street} {orderDetails.houseNumber}, {orderDetails.city}
                            </p>
                            <p><strong>Phone:</strong> {orderDetails.phone}</p>
                            <p><strong>Pizzas:</strong></p>
                            <ul>
                                {orderDetails.pizzas.map((pizza, index) => (
                                    <li key={index}>
                                        Pizza {index + 1}: <br/>
                                        <div> Ingredients:</div>
                                        <div className="d-flex flex-wrap">
                                            {pizza.ingredients.map((ingredient, i) => {
                                                const ingredientData = getIngredientData(ingredient);
                                                return ingredientData ? (
                                                    <img
                                                        key={i}
                                                        src={ingredientData.image}
                                                        alt={ingredientData.name}
                                                        style={{width: '50px', marginRight: '5px', marginBottom: '5px'}}
                                                    />
                                                ) : null;
                                            })}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseOrderModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Cart;
