import React, { useEffect, useState } from "react";
import { Container, Offcanvas } from "react-bootstrap";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./SidebarLayout.module.scss";
interface Iprops {
  children: React.ReactNode;
  handleToggle: () => void;
  title: string;
  show: boolean;
  sideOpen?: any;
}
const SidebarLayout = ({
  children,
  handleToggle,
  title,
  show,
  sideOpen = "end",
}: Iprops) => {
  return (
    <div className={styles.sidebarOuter}>
      <Offcanvas placement={sideOpen} show={show} onHide={handleToggle}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default SidebarLayout;
