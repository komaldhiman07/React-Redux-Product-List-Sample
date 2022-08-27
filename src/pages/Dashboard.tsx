import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ImUsers } from "react-icons/im";
import { BsFillHandbagFill } from "react-icons/bs";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import { ProductListCall, UserListCall } from "../services/ApiCalls";
import styles from "./styles/Dashboard.module.scss";
import { Link } from "react-router-dom";

interface IProducts {
  total: string;
  products: IProduct[];
}
interface IProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: 1;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
interface IUsers {
  total: string;
  users: any;
}

const Dashboard = () => {
  // ================== States ======================

  const [productData, setProductData] = useState<IProducts>({
    total: "",
    products: [],
  });
  const [userList, setUserList] = useState<IUsers>({
    total: "",
    users: [],
  });
  const [loading, setLoading] = useState({
    productLoading: true,
    userLoading: true,
  });

  // ================== Get product list ======================

  const handleProductList = async () => {
    try {
      const res = await ProductListCall();
      console.log("productList===>", res);
      setProductData({
        total: res.data.total,
        products: res.data.products,
      });
      if (res.status === 200) {
        setLoading({ ...loading, productLoading: false });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("loading ==> ", loading);
  }, [loading]);

  // ================== Get Users list ======================

  const handleUserList = async () => {
    try {
      const res = await UserListCall();
      console.log("UserList===>", res);
      setUserList({
        total: res.data.total,
        users: res.data.users,
      });
      if (res.status === 200) {
        setLoading({ ...loading, userLoading: false });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleProductList();
    handleUserList();
  }, []);
  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        {/* {!loading.productLoading && !loading.userLoading ? ( */}
        <div>
          <h1>Welcome</h1>
        </div>
        <div className={styles.cardWrapper}>
          <Row className="g-5">
            <Col md={6}>
              <Link to="/product">
                <div className={styles.dashBoardCard}>
                  <h4>All Products</h4>
                  <div className={styles.listNumber}>
                    <BsFillHandbagFill />
                    <span>
                      {productData.total === "" ? "00" : productData?.total}
                    </span>
                  </div>
                </div>
              </Link>
            </Col>
            <Col md={6}>
              <Link to="/user">
                <div className={styles.dashBoardCard}>
                  <h4>All Users</h4>
                  <div className={styles.listNumber}>
                    <ImUsers />
                    <span>
                      {userList.total === "" ? "00" : userList?.total}
                    </span>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
        </div>
        {/* ) : (
          <h2>Loading....</h2>
        )} */}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
