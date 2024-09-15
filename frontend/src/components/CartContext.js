import React, { createContext, useReducer } from 'react';
// Create the CartContext
const CartContext = createContext();
// Initial state for the cart
const initialState = {
    cart: [],
    currentSelection: []
};
/**
 * Reducer function to manage cart state
 *
 * @param {Object} state - The current state of the cart.
 * @param {Object} action - The action to be processed.
 * @returns {Object} The new state after applying the action.
 * @returns {(*&{currentSelection: *})|(*&{cart: T[]})|*|(*&{cart: (*|{ingredients: any}|T)[]})|(*&{cart: *[]})}
 */
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_PIZZA':
            return { ...state, cart: [...state.cart, action.payload] };
        case 'UPDATE_PIZZA':
            const updatedCart = state.cart.map((pizza, index) =>
                index === action.payload.index ? { ...pizza, ingredients: action.payload.ingredients } : pizza
            );
            return { ...state, cart: updatedCart };
        case 'REMOVE_PIZZA':
            return { ...state, cart: state.cart.filter((_, index) => index !== action.payload) };
        case 'CLEAR_CART':
            return { ...state, cart: [] };
        case 'UPDATE_CURRENT_SELECTION':
            return { ...state, currentSelection: action.payload };
        default:
            return state;
    }
};

/**
 * CartProvider component to provide cart state and dispatch function
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the cart context.
 * @returns {JSX.Element} The CartContext provider wrapping the child components.
 */
const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
