# Documentation of Database Models and Associations

## Models Used

### 1. **User**

- **Description**: The `User` model represents the users of the application, who can be either customers or sellers.
- **Relationships**:
  - **With Product**: A user can have multiple products if they are a seller. This is defined by a `hasMany` relationship with the `Product` model via the foreign key `seller_id`.
  - **With Order**: A user can make multiple orders as a customer. This is represented by a `hasMany` relationship with the `Order` model via the foreign key `client_id`.

### 2. **Category**

- **Description**: The `Category` model represents the different categories in which products can be classified.
- **Relationships**:
  - **With Product**: A category can contain multiple products. This relationship is defined by a `hasMany` with the `Product` model via the foreign key `category_id`.

### 3. **Product**

- **Description**: The `Product` model represents the products available on the platform.
- **Relationships**:
  - **With User**: Each product belongs to a seller, represented by a `belongsTo` relationship with the `User` model via the foreign key `seller_id`.
  - **With Category**: Each product belongs to a category, defined by a `belongsTo` relationship with the `Category` model via the foreign key `category_id`.
  - **With OrderItem**: A product can be included in multiple order items (`OrderItem`). This is represented by a `hasMany` relationship with the `OrderItem` model via the foreign key `product_id`.

### 4. **Order**

- **Description**: The `Order` model represents an order placed by a customer.
- **Relationships**:
  - **With User**: Each order is associated with a customer (user) via a `belongsTo` relationship with the `User` model via the foreign key `client_id`.
  - **With OrderItem**: An order can contain multiple order items, defined by a `hasMany` relationship with the `OrderItem` model via the foreign key `order_id`.

### 5. **OrderItem**

- **Description**: The `OrderItem` model represents a specific item within an order, associating a product with an order.
- **Relationships**:
  - **With Order**: Each order item belongs to an order, defined by a `belongsTo` relationship with the `Order` model via the foreign key `order_id`.
  - **With Product**: Each order item is associated with a product, represented by a `belongsTo` relationship with the `Product` model via the foreign key `product_id`.

## Associations and Relationships

Associations are defined to establish relationships between the various models in the database, facilitating navigation and complex queries. Here is a summary of the key associations:

- **User <-> Product**: A user (seller) can have multiple products, and conversely, each product belongs to a user.
- **Category <-> Product**: A category can include multiple products, and each product belongs to a category.
- **User <-> Order**: A user (customer) can place multiple orders, and each order is associated with a user.
- **Order <-> OrderItem**: An order can contain multiple items, and each order item is linked to a specific order.
- **Product <-> OrderItem**: A product can appear in multiple order items, and each order item is associated with a specific product.

These relationships allow for efficient modeling of interactions between the various entities of the application, making it easier to manage users, products, categories, orders, and order items in the database.
