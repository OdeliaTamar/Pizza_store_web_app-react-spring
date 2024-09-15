
<h1>Pizza Online Store</h1>
This is a web application for an online pizza store built using React for the frontend and Spring Boot for the backend. The application allows users to create new pizza orders, view their cart, fill out client information, and review old orders.

#### Features
- **New Order**: Users can select ingredients and add pizzas to their cart.
- **Cart**: Users can view, edit, and delete pizzas in their cart. The total price of the pizzas is automatically calculated.
- **Client Information**: Users fill out their personal details before submitting an order.
- **Order Confirmation**: After submitting an order, users receive a confirmation with an Order ID, which includes both letters and numbers, for example: `Order ID: a59f1ad5-1b2c-4ee7-bcdc-00f8b3ca881e`.
- **Old Order**: Users can retrieve their previous orders by entering the Order ID.

#### Technologies Used
- **Frontend**: React, React Router, Bootstrap, js-cookie
- **Backend**: Spring Boot

#### Installation

1. **Backend Setup**:
    - Open the backend project in your IDE (e.g., IntelliJ, Eclipse).
    - Run the Spring Boot application.
    - Make sure the backend is running on `http://localhost:8080`.

2. **Frontend Setup**:
    - Navigate to the `client` directory:
      ```bash
      cd client
      ```
    - Install the dependencies:
      ```bash
      npm install
      ```
    - Install the js-cookie library:
      ```bash
      npm install js-cookie
      ```
    - Start the frontend development server:
      ```bash
      npm start
      ```
    - The frontend should now be running on `http://localhost:3000`.

#### Usage
1. **New Order**:

#### Notes
- **Using js-cookie**: We used the `js-cookie` library to store user details in cookies, allowing the form to be pre-filled with the user's information on subsequent visits.
- **Cart Implementation**: The cart is managed locally within the React application. Therefore, refreshing the page will clear the cart.
- **Order ID**: The Order ID is a unique identifier generated by the backend and contains both letters and numbers.

#### Known Issues
- Refreshing the page will clear the cart since it is managed locally in React.

Enjoy your pizza! 🍕
=======
# Pizza_store_web_app-react-spring
>>>>>>> 47dc8f4b1782ff10575daaab178308d50997ba8b
