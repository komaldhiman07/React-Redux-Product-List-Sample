import React, { useEffect, useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import { SingleProductListCall } from "../services/ApiCalls";
import styles from "./styles/ProductDetail.module.scss";

const ProductDetail = () => {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState<any>([]);
  const { id } = useParams();
  const productId = id;
  const handleSingleProductData = async (id: number) => {
    setLoading(true);
    try {
      const res = await SingleProductListCall(id);
      console.log("response===>", res);
      setProductData(res.data);
      if (res.status === 200) {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleSingleProductData(Number(productId));
  }, []);
  return (
    <DashboardLayout>
      {!loading ? (
        <div className={styles.page}>
          <Container>
            <div className={styles.page_inner}>
              <Row className="g-4">
                <Col md={4}>
                  <div className={styles.productImg}>
                    <img src={productData.thumbnail} alt="" />
                  </div>
                </Col>
                <Col md={7}>
                  <div className={styles.productHeading}>
                    <h3>{productData.title}</h3>
                    <p>{productData.description}</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </DashboardLayout>
  );
};

// ==================== Internal components ===============

export default ProductDetail;
