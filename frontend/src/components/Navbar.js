import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from "react-router-dom";

/**
 * the AppNavbar component
 * @returns {Element}
 * @constructor
 */
const AppNavbar = () => (
    //creat the AppNavbar component
    <Navbar expand="lg">
        <Nav.Link as={Link} to="/" className="d-inline-block align-content-center">
        <img
            src={"/images/pizzaLogo.png"}
            className="d-inline-block align-content-center"
            alt="Build Pizza"
        />
        </Nav.Link>{'  '}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/cart" >
                    <img
                        src={"/images/cart.png"}
                        className="d-inline-block align-top"
                        alt="Cart"
                    />
                </Nav.Link>

                <Nav.Link as={Link} to="/history" className="d-inline-block align-content-center  icon-text">
                    <img
                        src={"/images/history1.png"}
                        className="d-inline-block align-top"
                        alt="Order History Icon"
                        width={100}
                    />
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default AppNavbar;
