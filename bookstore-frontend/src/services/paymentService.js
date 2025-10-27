import axios from "axios";
import { API_URLS } from "../config";

const baseURL = API_URLS.payment;

// Crear un nuevo pago (inicio de checkout)
export async function createPayment(paymentData) {
    const res = await axios.post(`${baseURL}/create`, paymentData);
    return res.data;
}

// Procesar un pago (simular confirmación)
export async function processPayment(reference) {
    const res = await axios.post(`${baseURL}/${reference}/process`);
    return res.data;
}

// Obtener todos los pagos
export async function getAllPayments() {
    const res = await axios.get(baseURL);
    return res.data;
}

// Obtener un pago específico
export async function getPaymentByReference(reference) {
    const res = await axios.get(`${baseURL}/${reference}`);
    return res.data;
}

// Eliminar un pago
export async function deletePayment(reference) {
    const res = await axios.delete(`${baseURL}/${reference}`);
    return res.data;
}

// Reembolsar un pago
export async function refundPayment(reference) {
    const res = await axios.put(`${baseURL}/${reference}/refund`);
    return res.data;
}
