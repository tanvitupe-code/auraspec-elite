import axios from 'axios';

const API_BASE = 'http://localhost:5001/api';

export const productService = {
  getAllProducts: async () => {
    const res = await axios.get(`${API_BASE}/products`);
    return res.data;
  }
};