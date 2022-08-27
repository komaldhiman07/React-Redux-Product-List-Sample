import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard/ProductCard";
import styles from "./styles/CartList.module.scss";
import { removeCart } from "../store/CartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart);
  useEffect(() => {
    console.log("cartItems====>", cartItems);
  }, [cartItems]);
  const removeCartItem = (item: number) => {
    dispatch(removeCart(item));
    console.log("item==========>", item);
  };

  return (
    <DashboardLayout>
      <div className={styles.ProductListPage}>
        <h1>All cart items</h1>
        {cartItems.length ? (
          cartItems.map((item: any) => (
            <ProductCard
              product={item}
              removeCart={() => {
                removeCartItem(item.id);
              }}
            />
          ))
        ) : (
          <div>Your cart is empty</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Cart;
