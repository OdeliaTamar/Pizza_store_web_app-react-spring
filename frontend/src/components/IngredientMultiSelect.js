import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { CartContext } from './CartContext';
import { useLocation } from 'react-router-dom';

/**
 * the IngredientMultiSelect componnent
 * @returns {Element}
 * @constructor
 */
const IngredientMultiSelect = () => {
    const { state, dispatch } = useContext(CartContext);// Destructuring state and dispatch from CartContext
    const [ingredients, setIngredients] = useState([]);// State for storing the list of ingredients
    const [errorMessage, setErrorMessage] = useState('');// State for storing error messages
    const [showSuccessModal, setShowSuccessModal] = useState(false);// State for controlling the visibility of the success modal
    const [checkedStatus, setCheckedStatus] = useState({});// State for managing the checked status of ingredients
    const location = useLocation();// Hook to get the current route location
    const pizzaIndex = location.state?.pizzaIndex;// Getting the pizza index from the route state, if available

    // Fetch ingredients from API when the component mounts
    useEffect(() => {
        fetch('/api/ingredients')
            .then(response => response.json())
            .then(data => {
                setIngredients(data);// Setting the ingredients state with the fetched data
                const initialStatus = {};// Initial status object to store the checked status of ingredients
                data.forEach(ingredient => {
                    initialStatus[ingredient.id] = false;// Initializing each ingredient's checked status to false
                });

                if (state.currentSelection.length > 0) {
                    const currentSelectionStatus = { ...initialStatus };// Copying the initial status
                    state.currentSelection.forEach(id => {
                        currentSelectionStatus[id] = true;// Setting the checked status to true for currently selected ingredients
                    });
                    setCheckedStatus(currentSelectionStatus);// Updating the checked status state with the current selection
                } else if (pizzaIndex !== undefined) {
                    const existingPizza = state.cart[pizzaIndex];// Getting the existing pizza from the cart using the pizza index
                    if (existingPizza) {
                        const existingStatus = { ...initialStatus };// Copying the initial status
                        existingPizza.ingredients.forEach(id => {
                            existingStatus[id] = true;// Setting the checked status to true for ingredients in the existing pizza
                        });
                        setCheckedStatus(existingStatus);// Updating the checked status state with the existing pizza's ingredients
                    }
                } else {
                    setCheckedStatus(initialStatus);
                }
            });
    }, [state.cart, state.currentSelection, pizzaIndex]);// useEffect dependencies: state.cart, state.currentSelection, and pizzaIndex


    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;// Destructuring id and checked from the event target
        const updatedStatus = { ...checkedStatus, [id]: checked };// Updating the checked status with the new value
        setCheckedStatus(updatedStatus);// Setting the new checked status

        const selectedIngredients = Object.keys(updatedStatus).filter(key => updatedStatus[key]);// Getting the list of selected ingredients
        dispatch({ type: 'UPDATE_CURRENT_SELECTION', payload: selectedIngredients });// Dispatching the updated selection to the context

    };

    const handleAddToCart = () => {
        const selected = Object.keys(checkedStatus).filter(id => checkedStatus[id]);// Getting the list of selected ingredients

        if (selected.length < 2) {
            setErrorMessage('Please select at least 2 ingredients.');// Setting error message if less than 2 ingredients are selected
            return;
        }
        setErrorMessage('');// Clearing the error message

        if (pizzaIndex !== undefined) {
            dispatch({ type: 'UPDATE_PIZZA', payload: { index: pizzaIndex, ingredients: selected } });// Dispatching action to update an existing pizza in the cart

        } else {
            const pizza = { ingredients: selected };// Creating a new pizza object with the selected ingredients
            dispatch({ type: 'ADD_PIZZA', payload: pizza });// Dispatching action to add a new pizza to the cart

        }
        setShowSuccessModal(true);  // Clear current selection in the context
        dispatch({ type: 'UPDATE_CURRENT_SELECTION', payload: [] });    // Clearing the current selection in the context
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);// Hiding the success modal

    };

    return (
        <Form>
            {ingredients.map((ingredient) => (
                <Form.Check
                    key={ingredient.id}

                    type="checkbox"

                    id={ingredient.id}
                    // Setting the label with an image and name of the ingredient
                    label={<span><img src={ingredient.image} alt={ingredient.name} style={{ width: '50px', marginRight: '10px' }} /> {ingredient.name}</span>}
                    onChange={handleCheckboxChange}
                    checked={checkedStatus[ingredient.id] || false}
                />
            ))}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Button  variant="outline-warning" onClick={handleAddToCart}>{pizzaIndex !== undefined ? 'Update Cart' : 'Add to Cart'}</Button>
            <Modal show={showSuccessModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Pizza {pizzaIndex !== undefined ? 'updated' : 'added'} to cart successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
};

// Exporting the IngredientMultiSelect component
export default IngredientMultiSelect;
