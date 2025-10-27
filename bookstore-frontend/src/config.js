// src/config.js

export const API_URLS = {
    gateway: import.meta.env.VITE_API_GATEWAY || "http://localhost:8080",
    catalog: import.meta.env.VITE_CATALOG_SERVICE || "http://localhost:3000/api",
    cart: import.meta.env.VITE_CART_SERVICE || "http://localhost:5000/api",
    order: import.meta.env.VITE_ORDER_SERVICE || "http://localhost:4000/api/orders",
    payment: import.meta.env.VITE_PAYMENT_SERVICE || "http://localhost:7000/api/payments",
    user: import.meta.env.VITE_USER_SERVICE || "http://localhost:6000/api/auth",
};
  