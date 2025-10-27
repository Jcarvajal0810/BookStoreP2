import axios from 'axios';
import { API_URLS } from "../config";

const baseURL = API_URLS.cart;

export async function getCart(userId) {
    const res = await axios.get(`${baseURL}/cart/${userId}`);
    return res.data;
}

export async function getCartTotal(userId) {
    const res = await axios.get(`${baseURL}/cart/total/${userId}`);
    return res.data;
}

export async function addToCart(userId, bookId, quantity = 1) {
    const res = await axios.post(`${baseURL}/cart/add`, { userId, bookId, quantity });
    return res.data;
}

export async function updateCartItem(userId, bookId, quantity) {
    const res = await axios.put(`${baseURL}/cart/update`, { userId, bookId, quantity });
    return res.data;
}

export async function removeFromCart(bookId) {
    const res = await axios.delete(`${baseURL}/cart/remove/${bookId}`);
    return res.data;
}

export async function clearCart(userId) {
    const res = await axios.delete(`${baseURL}/cart/clear/${userId}`);
    return res.data;
}
