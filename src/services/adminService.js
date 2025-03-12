// src/services/adminService.js
import axios from 'axios';
import API_ENDPOINTS from '../config/api';

// Create an Axios instance with default config
const apiClient = axios.create({
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding the auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle authentication errors
    if (response && response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

const adminService = {
  // Products
  getAllProducts: async () => {
    return await apiClient.get(API_ENDPOINTS.PRODUCTS);
  },
  
  getProductById: async (id) => {
    // For now, we'll get all products and filter by ID
    // In a real API, you'd have a dedicated endpoint
    const response = await apiClient.get(API_ENDPOINTS.PRODUCTS);
    const product = response.data?.data.find(p => p.id === parseInt(id));
    return product;
  },
  
  createProduct: async (productData) => {
    return await apiClient.post(API_ENDPOINTS.ADD_PRODUCT, productData);
  },
  
  updateProduct: async (id, productData) => {
    return await apiClient.put(API_ENDPOINTS.UPDATE_PRODUCT(id), productData);
  },
  
  deleteProduct: async (id) => {
    return await apiClient.delete(API_ENDPOINTS.DELETE_PRODUCT(id));
  },
  
  // Orders - these would need to be connected to real endpoints in your backend
  getAllOrders: async () => {
    // This is a placeholder since we don't have a real orders API yet
    // return await apiClient.get(API_ENDPOINTS.ORDERS);
    
    // Mock data for now
    return {
      data: {
        success: true,
        data: Array.from({ length: 30 }, (_, index) => {
          const id = index + 1;
          const date = new Date();
          date.setDate(date.getDate() - Math.floor(Math.random() * 30));
          
          return {
            id,
            customer: {
              id: 100 + id,
              name: `Customer ${id}`,
              email: `customer${id}@example.com`
            },
            order_date: date.toISOString().split('T')[0],
            total_amount: Math.floor(Math.random() * 10000) + 1000,
            shipment_status: Math.random() > 0.5 ? 'Delivered' : 'Pending',
            payment_status: Math.random() > 0.5 ? 'Paid' : 'Unpaid',
            items: Math.floor(Math.random() * 5) + 1
          };
        })
      }
    };
  },
  
  getOrderById: async (id) => {
    // This is a placeholder for now
    // return await apiClient.get(API_ENDPOINTS.ORDER_DETAIL(id));
    
    // Mock data for now
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 10));
    
    return {
      data: {
        success: true,
        data: {
          id: parseInt(id),
          order_date: orderDate.toISOString().split('T')[0],
          shipment_status: Math.random() > 0.5 ? 'Delivered' : 'Pending',
          payment_status: Math.random() > 0.5 ? 'Paid' : 'Unpaid',
          total_amount: Math.floor(Math.random() * 10000) + 1000,
          customer: {
            id: 100 + parseInt(id),
            name: `Customer ${id}`,
            email: `customer${id}@example.com`,
            phone: `+66${Math.floor(Math.random() * 1000000000)}`,
            address: '123 Bangkok Street, Silom, Bangkok 10500, Thailand'
          },
          payment: {
            id: 200 + parseInt(id),
            method: Math.random() > 0.5 ? 'CreditCard' : 'Promptpay',
            date: new Date().toISOString().split('T')[0],
            amount: Math.floor(Math.random() * 10000) + 1000
          },
          items: [
            {
              id: 1,
              product: {
                id: 301,
                productname: 'Samba OG Shoes',
                brand: 'Adidas',
                images: JSON.stringify([
                  "https://res.cloudinary.com/dfmqmyop1/image/upload/v1741702211/Samoa_Shoes_White_JQ0047_01_00_standard_nheewb.jpg"
                ])
              },
              price: 3800,
              quantity: 1
            },
            {
              id: 2,
              product: {
                id: 302,
                productname: 'Hoka Speedgoat 5',
                brand: 'Hoka',
                images: JSON.stringify([
                  "https://res.cloudinary.com/dfmqmyop1/image/upload/v1741750169/9991-HKE1123158CR0CM006-1_kfswf8.jpg"
                ])
              },
              price: 5990,
              quantity: 1
            }
          ]
        }
      }
    };
  },
  
  updateOrderStatus: async (id, status) => {
    // This is a placeholder
    // return await apiClient.put(API_ENDPOINTS.UPDATE_ORDER_STATUS(id), { status });
    
    // Mock response
    return {
      data: {
        success: true,
        message: `Order #${id} status updated to ${status}`
      }
    };
  },
  
  // Categories - assuming you have these endpoints
  getCategories: async () => {
    // This would fetch from a real endpoint in production
    return {
      data: {
        success: true,
        data: [
          { id: 1, categoryname: 'Sneakers' },
          { id: 2, categoryname: 'Sports' },
          { id: 3, categoryname: 'Sandals' },
          { id: 4, categoryname: 'Slippers' },
        ]
      }
    };
  },
  
  // Authentication
  login: async (credentials) => {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  
  logout: () => {
    localStorage.removeItem('token');
  }
};

export default adminService;