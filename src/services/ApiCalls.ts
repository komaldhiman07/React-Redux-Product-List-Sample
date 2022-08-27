import axios from "axios";
import API_BASE_URL from "./constants";

export const ProductListCall = (limit: number = 20) => {
  return axios
    .get(`${API_BASE_URL}/products?limit=${limit}`)
    .then((response) => {
      return response;
    });
};
export const UserListCall = (skip: number = 0, limit: number = 0) => {
  return axios
    .get(`${API_BASE_URL}/users?limit=${limit}&skip=${skip}`)
    .then((response) => {
      return response;
    });
};
export const ProductSearch = (query: string) => {
  return axios
    .get(`${API_BASE_URL}/products/search?q=${query}`)
    .then((response) => {
      console.log(response);
      return response;
    });
};
export const UserSearch = (query: string) => {
  return axios
    .get(`${API_BASE_URL}/users/search?q=${query}`)
    .then((response) => {
      return response;
    });
};
export const SingleUserListCall = (id: number = 0) => {
  return axios.get(`${API_BASE_URL}/users/${id}`).then((response) => {
    return response;
  });
};
export const SingleProductListCall = (id: number = 0) => {
  return axios.get(`${API_BASE_URL}/products/${id}`).then((response) => {
    return response;
  });
};
