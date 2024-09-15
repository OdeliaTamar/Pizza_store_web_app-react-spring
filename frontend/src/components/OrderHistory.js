import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

/**
 * the OrderHistory componnent
 * @returns {Element}
 * @constructor
 */
const OrderHistory = () => {
    const [orderCode, setOrderCode] = useState('');// State for storing the order code input by the user
    const [orderDetails, setOrderDetails] = useState(null);// State for storing the details of the
    const [ingredients, setIngredients] = useState([]);// State for storing the list of ingredients fetched from the server

    //get the pictures from the server
    useEffect(() => {
        fetch('/api/ingredients')
            .then(response => response.json())
            .then(data => setIngredients(data))
            .catch(() => alert('Failed to fetch ingredients'));
    }, []);

    //handle the search
    const handleSearch = e => {
        e.preventDefault();
        fetch(`/api/orders/${orderCode}`)
            .then(response => response.json())
            .then(data => setOrderDetails(data))
            .catch(() => alert('Order not found'));
    };

    //get the ingredient data
    const getIngredientData = (id) => {
        return ingredients.find(ingredient => ingredient.id.toString() === id);
    };

    return (
        <div className="container mt-5">
            <h1>Order History</h1>
            <Form onSubmit={handleSearch}>
                <Form.Group controlId="formOrderCode">
                    <Form.Label>Order Code</Form.Label>
                    <Form.Control type="text" value={orderCode} onChange={e => setOrderCode(e.target.value)} />
                </Form.Group>
                <Button variant="outline-warning" className="mt-3" type="submit">Search</Button>
            </Form>
            {orderDetails && (
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title><strong>Order Details:</strong></Card.Title>
                        <Card.Text><strong>Name: </strong>{orderDetails.firstName} {orderDetails.lastName}</Card.Text>
                        <Card.Text><strong>Address: </strong>{orderDetails.street} {orderDetails.houseNumber}, {orderDetails.city}</Card.Text>
                        <Card.Text><strong>Phone: </strong>{orderDetails.phone}</Card.Text>
                        <Card.Title><strong>Pizzas:</strong></Card.Title>
                        <ul>
                            {orderDetails.pizzas.map((pizza, index) => (
                                <li key={index}>
                                    Pizza {index + 1}: <br/>
                                    Ingredients:
                                    <div className="d-flex flex-wrap">
                                        {pizza.ingredients.map((ingredient, i) => {
                                            const ingredientData = getIngredientData(ingredient);
                                            return ingredientData ? (
                                                <img
                                                    key={i}
                                                    src={ingredientData.image}
                                                    alt={ingredientData.name}
                                                    style={{ width: '50px', marginRight: '5px', marginBottom: '5px' }}
                                                />
                                            ) : null;
                                        })}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default OrderHistory;
