// src/config/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_URL}/auth/login`,
  REGISTER: `${API_URL}/auth/register`,
  
  // Products
  PRODUCTS: `${API_URL}/api/product/show-product`,
  ADD_PRODUCT: `${API_URL}/api/product/add-product`,
  UPDATE_PRODUCT: (id) => `${API_URL}/api/product/update-product/${id}`,
  DELETE_PRODUCT: (id) => `${API_URL}/api/product/delete-product/${id}`,
  
  // Orders
  ORDERS: `${API_URL}/api/order/show-order`,
  ORDER_DETAIL: (id) => `${API_URL}/api/order/${id}`,
  UPDATE_ORDER_STATUS: (id) => `${API_URL}/api/order/update-status/${id}`,
  
  // User
  USER_PROFILE: `${API_URL}/user/my-account`,
  UPDATE_PROFILE: `${API_URL}/user/update-account`,
  
  // Cart
  VIEW_CART: `${API_URL}/api/cart/view-cart`,
  ADD_TO_CART: `${API_URL}/api/cart/add-cart`,
  
  // Wishlist
  VIEW_WISHLIST: `${API_URL}/api/wishlist/view-wishlist`,
  ADD_TO_WISHLIST: `${API_URL}/api/wishlist/add-to-wishlist`,
  REMOVE_FROM_WISHLIST: (id) => `${API_URL}/api/wishlist/remove-from-wishlist/${id}`,
};

export default API_ENDPOINTS;