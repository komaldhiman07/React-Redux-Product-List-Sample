import React from "react";
import { FiUsers } from "react-icons/fi";
import { RiShoppingBag3Line } from "react-icons/ri";
import { GoDashboard } from "react-icons/go";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const itemsLength = useSelector((state: any) => state.cart.length);
  return (
    <div className={styles.sidebarList}>
      <ul>
        <NavLink to="/">
          <li>
            <GoDashboard />
            Dashboard
          </li>
        </NavLink>
        <NavLink to="/user">
          <li>
            <FiUsers />
            Users
          </li>
        </NavLink>
        <NavLink to="/product">
          <li>
            <RiShoppingBag3Line />
            Products
          </li>
        </NavLink>
        <NavLink to="/posts">
          <li>
            <RiShoppingBag3Line />
            Posts
          </li>
        </NavLink>
        <NavLink to="/cart">
          <li>
            <RiShoppingBag3Line />
            Cart Items ({itemsLength})
          </li>
        </NavLink>
      </ul>
    </div>
  );
};
export default Sidebar;
