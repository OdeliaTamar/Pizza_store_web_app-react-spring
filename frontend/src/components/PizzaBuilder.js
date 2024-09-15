import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserDetailsForm from './UserDetailsForm';
import IngredientMultiSelect from './IngredientMultiSelect';

/**
 * PizzaBuilder component
 *
 * @returns {JSX.Element} The PizzaBuilder component.
 * @constructor
 */
const PizzaBuilder = () => {
    const headerStyle = {
        fontFamily: "'Trebuchet MS', sans-serif",
        color: '#994f00', // Dark brown color
        fontWeight: 'bold', // Make the font thicker
    };

    const formContainerStyle = {
        border: '1px solid  #994f00', // Darker brown border
        borderRadius: '10px', // Rounded corners
        padding: '20px',
        marginBottom: '20px',
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                    <h3 style={headerStyle}>Enter your details:</h3>
                    <div style={formContainerStyle}>
                        <UserDetailsForm />
                    </div>
                </Col>
                <Col md={3}></Col>
                <Col md={3}>
                    <h3 style={headerStyle}>Build Your Pizza</h3>
                    <h6 style={headerStyle}>Choose at least 2 ingredients for pizza:</h6>
                    <div style={formContainerStyle}>
                        <IngredientMultiSelect />
                    </div>
                </Col>
                <Col md={2}></Col>
            </Row>
        </Container>
    );
};

export default PizzaBuilder;
