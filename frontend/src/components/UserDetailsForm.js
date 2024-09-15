import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';

/**
 * UserDetailsForm component
 *
 * @returns {JSX.Element} The UserDetailsForm component.
 * @constructor
 */
const UserDetailsForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        houseNumber: '',
        city: '',
        phone: ''
    });
    const [exist, setExist] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Flag to track if form is submitted

    // Handle changes in the form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    // Load user details from cookies if they exist
    useEffect(() => {
        const storedUserDetailsJSON = Cookies.get('userDetails');
        if (storedUserDetailsJSON) {
            const storedUserDetails = JSON.parse(storedUserDetailsJSON);
            setFormData(storedUserDetails);
            setExist(true);
        }
    }, []);

    // Validate form fields
    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'firstName':
                if (!value.trim()) {
                    error = 'First name is required';
                }
                break;
            case 'lastName':
                if (!value.trim()) {
                    error = 'Last name is required';
                }
                break;
            case 'street':
                if (!value.trim()) {
                    error = 'Street is required';
                }
                break;
            case 'houseNumber':
                if (!value.trim()) {
                    error = 'House number is required';
                }
                break;
            case 'city':
                if (!value.trim()) {
                    error = 'City is required';
                }
                break;
            case 'phone':
                if (!value.trim()) {
                    error = 'Phone number is required';
                } else if (!/^\d{10}$/.test(value)) {
                    error = 'Phone number must be 10 digits';
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    // Validate all fields
    const validateAllFields = () => {
        const validationErrors = {};
        for (const [name, value] of Object.entries(formData)) {
            validateField(name, value);
            if (value.trim() === '') {
                validationErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
            }
        }
        return validationErrors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateAllFields();
        const hasErrors = Object.keys(validationErrors).length > 0; // Check if there are errors
        setErrors(validationErrors);
        setIsFormSubmitted(true); // Mark the form as submitted, even if there are errors
        if (hasErrors) {
            return;
        }

        // Check for additional errors before submission
        for (const value of Object.values(formData)) {
            if (!value.trim()) {
                setIsFormSubmitted(true);
                return;
            }
        }

        // Save user details only if there are no errors
        const userDetailsJSON = JSON.stringify(formData);
        Cookies.set('userDetails', userDetailsJSON);
        setShowSuccessModal(true); // Show success modal
    };

    // Check if a field has an error
    const isFieldInvalid = (name) => Boolean(errors[name]);

    // Styles for the submit button
    const submitButtonStyle = {
        pointerEvents: Object.values(errors).some(error => error) ? 'none' : 'auto' // Enable button only if there are no errors
    };

    // Handle closing of the success modal
    const handleCloseModal = () => {
        setShowSuccessModal(false);
        setIsFormSubmitted(false); // Reset form submission flag
    };

    return (
        <div>
            {!exist ? (
                <Form onSubmit={handleSubmit} className="mb-3">
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} isInvalid={isFieldInvalid('firstName')} required/>
                        <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} isInvalid={isFieldInvalid('lastName')} required/>
                        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formStreet">
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" name="street" value={formData.street} onChange={handleChange} isInvalid={isFieldInvalid('street')} required/>
                        <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formHouseNumber">
                        <Form.Label>House Number</Form.Label>
                        <Form.Control type="text" name="houseNumber" value={formData.houseNumber} onChange={handleChange} isInvalid={isFieldInvalid('houseNumber')} required/>
                        <Form.Control.Feedback type="invalid">{errors.houseNumber}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} isInvalid={isFieldInvalid('city')} required/>
                        <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} isInvalid={isFieldInvalid('phone')} maxLength={10} required/>
                        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="outline-warning" className="mt-3" type="submit" style={submitButtonStyle} disabled={Object.values(errors).some(error => error)}>Save Details</Button>
                </Form>
            ) : (
                <div>
                    <p><strong>First Name:</strong> {formData.firstName}</p>
                    <p><strong>Last Name:</strong> {formData.lastName}</p>
                    <p><strong>Street:</strong> {formData.street}</p>
                    <p><strong>House Number:</strong> {formData.houseNumber}</p>
                    <p><strong>City:</strong>{formData.city}</p>
                    <p><strong>Phone Number:</strong> {formData.phone}</p>
                </div>
            )}

            <Modal show={showSuccessModal || isFormSubmitted} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your details have been saved successfully!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserDetailsForm;


