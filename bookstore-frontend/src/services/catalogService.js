import axios from 'axios';
import { API_URLS } from "../config";

const baseURL = API_URLS.catalog;

export async function getBooks() {
  const res = await axios.get(`${baseURL}/books`);
  return res.data;
}

export async function getBookById(id) {
  const res = await axios.get(`${baseURL}/books/${id}`);
  return res.data;
}

export async function searchBooksByTitle(title) {
  const res = await axios.get(`${baseURL}/books/search?title=${encodeURIComponent(title)}`);
  return res.data;
}
