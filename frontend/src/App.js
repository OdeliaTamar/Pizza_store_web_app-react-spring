
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import { CartProvider } from './components/CartContext';
import PizzaBuilder from './components/PizzaBuilder';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import Navbar from './components/Navbar';

/**
 * Main App component
 *
 * @returns {JSX.Element} The main application component with routing.
 * @constructor
 */
function App() {
    return (
        <CartProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<PizzaBuilder />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/history" element={<OrderHistory />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;
