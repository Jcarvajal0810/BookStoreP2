import axios from "axios";
import { API_URLS } from "../config";

const baseURL = API_URLS.order;

// Crear una nueva orden
export async function createOrder(orderData) {
    const res = await axios.post(baseURL, orderData);
    return res.data;
}

// Obtener todas las órdenes (admin)
export async function getAllOrders() {
    const res = await axios.get(baseURL);
    return res.data;
}

// Obtener una orden específica
export async function getOrderById(id) {
    const res = await axios.get(`${baseURL}/${id}`);
    return res.data;
}

// Obtener órdenes por usuario
export async function getOrdersByUser(userId) {
    const res = await axios.get(`${baseURL}/user/${userId}`);
    return res.data;
}

// Actualizar el estado de una orden
export async function updateOrderStatus(id, status) {
    const res = await axios.put(`${baseURL}/${id}/status`, { status });
    return res.data;
}

// Eliminar una orden
export async function deleteOrder(id) {
    const res = await axios.delete(`${baseURL}/${id}`);
    return res.data;
}
