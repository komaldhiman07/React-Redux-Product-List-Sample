import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
// import PrivateRoute from "./components/PrivateRoute";
import ProductList from "./pages/ProductList";
import UserList from "./pages/UserList";
import UserDetail from "./pages/UserDetail";
import Cart from "./pages/CartList";
import store from "./store/store";
import { Provider } from "react-redux";
import ProductDetail from "./pages/ProductDetail";
import PostsList from "./pages/PostsList";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/user/:id" element={<UserDetail />} />
            <Route path="/posts" element={<PostsList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
