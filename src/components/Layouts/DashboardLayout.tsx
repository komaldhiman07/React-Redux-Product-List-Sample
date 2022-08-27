import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./DashboardLayout.module.scss";
interface Iprops {
  children: React.ReactNode;
}
const DashboardLayout = ({ children }: Iprops) => {
  return (
    <div className={styles.DashboardLayout}>
      <Header />
      <div className={styles.DashboardPage}>
        <div className={styles.DashboardSidebar}>
          <Sidebar />
        </div>

        <div className={styles.DashboardBody}>
          <Container>{children}</Container>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
