# E-commerce Project

This e-commerce project is developed using a full-stack architecture featuring Express for the backend, React for the frontend, Sequelize for managing the MySQL database, and several other technologies for authentication, state management, and media storage.

---

## Table of Contents

- [Overview](#overview)
- [Design](#design)
- [Features](#features)
  - [Admin Dashboard](#admin-dashboard)
  - [Client](#client)
  - [Seller](#seller)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
- [Project Structure](#project-structure)
- [Development](#development)
- [Next Steps](#next-steps)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project focuses on rapid iteration and continuous deployment, with an emphasis on learning to collaborate effectively within a team. The primary objectives include:

- Effective project documentation.
- Strong group dynamics and collaboration skills.
- Robust product implementation and architecture.
- Comprehensive product design.

The project follows a sprint approach, with key features prioritized and implemented within a one-week timeframe. Teams were expected to iterate and improve on the product while maintaining clear and comprehensive documentation.

---

## Design

The project is designed to be user-centric, with distinct features for different user roles: Admin, Client, and Seller. The design philosophy emphasizes usability, security, and performance.

Teams are required to:

- Document code, syntax styling, and git workflows.
- Outline a feature roadmap.
- Use Figma models as design guides.

---

## Features

Here's a structured organization of the features for the Admin, Client, and Seller roles in your e-commerce project:

### Admin Dashboard

- **Secure Login**:  
  As an admin, I want to be able to log in to the admin dashboard securely.
- **Manage Registered Clients**:  
  As an admin, I want to view and manage the list of registered clients.
- **Manage Registered Sellers**:  
  As an admin, I want to view and manage the list of registered sellers.
- **Category Management**:  
  As an admin, I want to have the ability to add new categories or update existing categories for products.
- **Product Management**:  
  As an admin, I want to be able to view and manage the products listed on the platform.
- **User Permissions and Roles Management**:  
  As an admin, I want to manage user permissions and roles.

### Client

- **Account Registration**:  
  As a client, I want to be able to sign up for a new account.
- **Secure Login**:  
  As a client, I want to log in to my account securely.
- **Profile Management**:  
  As a client, I want to edit my profile.
- **Product Browsing**:  
  As a client, I want to view the list of available products.
- **Product Search**:  
  As a client, I want to search for products based on different criteria.
- **Shopping Cart**:  
  As a client, I want to add products to my cart for purchase.
- **Checkout and Payment**:  
  As a client, I want to proceed to checkout and make a secure payment.
- **Product Reviews**:  
  As a client, I want to rate and review products that I have purchased.

### Seller

- **Seller Account Registration**:  
  As a seller, I want to sign up for a new seller account.
- **Secure Login**:  
  As a seller, I want to log in to my seller account securely.
- **Profile Management**:  
  As a seller, I want to edit my profile.
- **Product Management**:  
  As a seller, I want to add and manage my products for sale.
- **Stock and Pricing Updates**:  
  As a seller, I want to update the stock availability and pricing for my products.

---

## Technologies Used

- **Backend**: Express.js
- **Frontend**: React.js
- **Database**: MySQL with Sequelize
- **Authentication**: JSON Web Token (JWT) using cookies
- **State Management**: Redux
- **Routing**: React Router Dom
- **UI**: Material UI
- **Media Storage**: Cloudinary
- **Payment Integration**: Flouci (optional feature)

---

## Installation

### Prerequisites

- Node.js
- MySQL
- Git

### Installation Steps

## **Project Startup**

### **1. Create the MySQL Database**

Create your MySQL database using MySQL Workbench or through the MySQL terminal (`mysql>`). Execute the following command to create the database:

```sql
CREATE DATABASE ecommerceWeek;
```

### **2. Clone the Repository**

Clone the project from GitHub and navigate to the project directory with the following commands:

```bash
git clone https://github.com/The-green-field-project/e-Commerce_Week.git
cd e-Commerce_Week
```

### **3. Configure the `.env` File**

After cloning the repository, create a `.env` file in the `backend` folder and add the necessary configuration information:

```plaintext
# Server configuration
PORT=3100
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=ecommerce
DB_URL=mysql://user:password@localhost:3306/ecommerce

# JWT (JSON Web Token)
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h

# CORS (Cross-Origin Resource Sharing) configuration
CORS_ORIGIN=http://localhost:3100

# Configuration for other services (e.g., Cloudinary)
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# SMTP (Simple Mail Transfer Protocol) for sending emails
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

Make sure to replace the placeholder values (`your_user`, `your_password`, `your_jwt_secret_key`, `your_smtp_user`, `your_smtp_password`, etc.) with your actual information.

### **4. Backend Setup**

1. **Install Dependencies:**

   Navigate to the `backend` folder and install the required dependencies with npm:

   ```bash
   cd backend
   npm install
   ```

2. **Start the Server:**

   Start the backend server for the first time using the following command:

   ```bash
   npm start
   ```

3. **Synchronize and Initialize the Database:**

   - Use `db.sync()` to synchronize the database during the first startup. Once the success message appears, comment out this line for subsequent startups.
   - Then, run the seeders to insert the initial data into the database:

     ```bash
     npm run main
     ```

### **5. Frontend Setup**

1. **Navigate to the Frontend Folder:**

   Once the backend is set up, navigate to the `frontend` folder:

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies:**

   Install the necessary dependencies for the frontend:

   ```bash
   npm install
   ```

3. **Start the Frontend:**

   Start the frontend server with the following command:

   ```bash
   npm start
   ```

---

## Development

The project was developed within a sprint framework over one week, focusing on key features first, followed by iterations for improvements and bug fixes.

### Team

- **Siwar Ameri** - Developer
- **Dhekra Maghroum** - Developer
- **Fedi Chebbi** - Developer
- **Aymen Khalfa** - Product Owner & Developer
- **Azyz Kabada** - Scrum Master & Developer
