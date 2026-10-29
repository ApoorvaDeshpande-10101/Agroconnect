import axios from 'axios';
 
const API = axios.create({ baseURL: '/api' });
 
API.interceptors.request.use((req) => {
  const user = localStorage.getItem('agroconnect_user');
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});
 
// Auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
 
// Products
export const getProducts = (params) => API.get('/products', { params });
export const getProduct = (id) => API.get(`/products/${id}`);
export const getMyProducts = () => API.get('/products/my-products');
export const addProduct = (data) => API.post('/products', data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);