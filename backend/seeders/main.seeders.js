'use strict';

const { Connection, models } = require("../database");
const bcrypt = require("bcrypt");
const { User, Category, Product, Order, OrderItem } = models;

const seedDatabase = async () => {
  try {
    await Connection.authenticate();
    console.log("Connected to the database successfully.");

    const users = [
      // Admins
      {
        username: "adminUser1",
        email: "admin1@example.com",
        password: "securepassword",
        role: "admin",
        wishlist: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "adminUser2",
        email: "admin2@example.com",
        password: "securepassword",
        role: "admin",
        wishlist: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "adminUser3",
        email: "admin3@example.com",
        password: "securepassword",
        role: "admin",
        wishlist: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Sellers
      {
        username: "sellerUser1",
        email: "seller1@example.com",
        password: "securepassword",
        role: "seller",
        wishlist: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "sellerUser2",
        email: "seller2@example.com",
        password: "securepassword",
        role: "seller",
        wishlist: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "sellerUser3",
        email: "seller3@example.com",
        password: "securepassword",
        role: "seller",
        wishlist: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Clients
      {
        username: "clientUser1",
        email: "client1@example.com",
        password: "securepassword",
        role: "client",
        wishlist: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "clientUser2",
        email: "client2@example.com",
        password: "securepassword",
        role: "client",
        wishlist: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "clientUser3",
        email: "client3@example.com",
        password: "securepassword",
        role: "client",
        wishlist: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Hash passwords
    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    const categories = [
      { name: "Women's Fashion", createdAt: new Date(), updatedAt: new Date() },
      { name: "Men's Fashion", createdAt: new Date(), updatedAt: new Date() },
      { name: "Electronics", createdAt: new Date(), updatedAt: new Date() },
      { name: "Home & Lifestyle", createdAt: new Date(), updatedAt: new Date() },
      { name: "Medicine", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sports & Outdoor", createdAt: new Date(), updatedAt: new Date() },
      { name: "Baby's & Toys", createdAt: new Date(), updatedAt: new Date() },
      { name: "Groceries & Pets", createdAt: new Date(), updatedAt: new Date() },
      { name: "Health & Beauty", createdAt: new Date(), updatedAt: new Date() },
    ];

    const products = [
      // Exclusive
      
      
      // Women's Fashion
      {
        name: "Dress 1",
        imageUrl: "https://m.media-amazon.com/images/I/71EYBsGn4uL._AC_UY350_.jpg",
        description: "Stylish women's dress",
        price: 50,
        stock: 100,
        seller_id: 6,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Shoes 1",
        imageUrl: "https://images-eu.ssl-images-amazon.com/images/I/51rsfWTRqCL.jpg",
        description: "Comfortable women's shoes",
        price: 70,
        stock: 80,
        seller_id: 4,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Men's Fashion
      {
        name: "Shirt 1",
        imageUrl: "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/28219632/2024/3/12/2f53aaab-40e1-4c5b-8148-6ad150e5f4341710256687634CampusSutraMenClassicOpaqueCheckedCasualShirt2.jpg",
        description: "Trendy men's shirt",
        price: 40,
        stock: 120,
        seller_id: 5,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Shoes 2",
        imageUrl: "https://www.bxxyshoe.in/cdn/shop/files/IMG_8586_2843f366-4549-4a58-9293-7198212c799d.jpg?v=1696847551&width=1946",
        description: "Durable men's shoes",
        price: 80,
        stock: 60,
        seller_id: 6,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Electronics
      {
        name: "Laptop 1",
        imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2023/11/editing-laptop-2048px-231551-2x1-1.jpg?auto=webp&quality=75&crop=1.91:1&width=1200",
        description: "High-performance laptop",
        price: 500,
        stock: 40,
        seller_id: 4,
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Headphones 1",
        imageUrl: "https://i5.walmartimages.com/seo/Sony-WH-CH720N-Noise-Canceling-Wireless-Bluetooth-Headphones-Black_8e3fa5d4-f841-4e6c-bb78-9959d29652ad.cc7bc3c09721e1951a7bc746c702ec58.jpeg",
        description: "Noise-canceling headphones",
        price: 100,
        stock: 70,
        seller_id: 5,
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Home & Lifestyle
      {
        name: "Sofa 1",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD8JRQoc2a2hiyAwg6aIlxB4Hl8nO9Olvc0A&s",
        description: "Comfortable sofa set",
        price: 300,
        stock: 20,
        seller_id: 6,
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lamp 1",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTem0oKt-rWjjkM8a6OKL9iIgHP19iKgmDvTA&s",
        description: "Modern desk lamp",
        price: 60,
        stock: 25,
        seller_id: 4,
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Medicine
      {
        name: "Painkiller 1",
        imageUrl: "https://cdn.webshopapp.com/shops/7221/files/320369509/650x650x2/scale-75-paintkiller-100-ml-scpk01.jpg",
        description: "Effective pain relief",
        price: 10,
        stock: 150,
        seller_id: 5,
        category_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cough Syrup 1",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG0gk_ieU1-mjcdMFv_Gcc-MCBVVGKRj516w&s",
        description: "Soothing cough syrup",
        price: 12,
        stock: 120,
        seller_id: 6,
        category_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Sports & Outdoor
      {
        name: "Tennis Racket 1",
        imageUrl: "https://stringsports.co.uk/cdn/shop/files/WR150210U_0_Blade_100UL_V9_GR.png?v=1706540511&width=1214",
        description: "Professional tennis racket",
        price: 100,
        stock: 30,
        seller_id: 4,
        category_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Yoga Mat 1",
        imageUrl: "https://m.media-amazon.com/images/I/71b5fW+s18L._AC_UF1000,1000_QL80_.jpg",
        description: "Comfortable yoga mat",
        price: 25,
        stock: 50,
        seller_id: 5,
        category_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Baby's & Toys
      {
        name: "Toy Car 1",
        imageUrl: "https://m.media-amazon.com/images/I/81ZN1Y+I1iL._AC_SL1500_.jpg",
        description: "Fun toy car for kids",
        price: 20,
        stock: 80,
        seller_id: 6,
        category_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Baby Blanket 1",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQauDqDV1EhfRV-SDRpyij6gSb4dJ8v9cHLpw&s",
        description: "Soft baby blanket",
        price: 15,
        stock: 90,
        seller_id: 4,
        category_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Groceries & Pets
      {
        name: "Dog Food 1",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_77gcC33wPYvj-PxrU3aPZkEYA8T9dbNCUg&s",
        description: "Nutritious dog food",
        price: 30,
        stock: 100,
        seller_id: 5,
        category_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Coffee Beans 1",
        imageUrl: "https://www.adivedanatural.com/cdn/shop/articles/smeeling-coffee-beans_900x_5148e663-e441-4642-af81-ade43296e6b5_800x.jpg?v=1615107959",
        description: "Fresh coffee beans",
        price: 12,
        stock: 110,
        seller_id: 6,
        category_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Health & Beauty
      {
        name: "Face Cream 1",
        imageUrl: "https://m.media-amazon.com/images/I/71OpblNiYBL.jpg",
        description: "Moisturizing face cream",
        price: 25,
        stock: 75,
        seller_id: 4,
        category_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Shampoo 1",
        imageUrl: "https://tn.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/87/4438/1.jpg?8846",
        description: "Gentle shampoo",
        price: 15,
        stock: 80,
        seller_id: 5,
        category_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await User.bulkCreate(users);
    console.log("Users were seeded successfully.");

    await Category.bulkCreate(categories);
    console.log("Categories were seeded successfully.");

    await Product.bulkCreate(products);
    console.log("Products were seeded successfully.");
    
  } catch (error) {
    console.error("Failed to seed data:", error);
  } finally {
    await Connection.close();
    console.log("Database connection closed.");
  }
};

seedDatabase();
