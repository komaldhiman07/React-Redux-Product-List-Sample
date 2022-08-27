import { Formik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  Row,
  ToggleButton,
} from "react-bootstrap";
import { IProductData } from "../../interfaces";
// import styles from "./AddUser.module.scss";
interface IProps {
  productEdit: IProductData;
  updateProductList: (values: IProductData) => void;
  toggleSidebar: () => void;
}
const AddProductForm = ({
  productEdit,
  updateProductList,
  toggleSidebar,
}: IProps) => {
  const [userChanges, setUserChanges] = useState<IProductData>({
    id: undefined,
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    stock: 0,
    brand: "",
    category: "",
    thumbnail: "",
  });
  // const submitForm = () => {
  //   handleUpdate(userEdit);
  // };
  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    discountPercentage: yup.number().required(),
    stock: yup.string().required(),
    brand: yup.string().ensure().required(),
    // category: yup.string().required(),
    // thumbnail: yup.string().required(),
  });
  useEffect(() => {
    if (productEdit) {
      setUserChanges({
        id: productEdit?.id,
        title: productEdit.title,
        description: productEdit.description,
        price: productEdit.price,
        discountPercentage: productEdit.discountPercentage,
        stock: productEdit.stock,
        brand: productEdit.brand,
        category: productEdit.category,
        thumbnail: productEdit.thumbnail,
      });
    }
  }, [productEdit]);

  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={(values: IProductData) => {
          updateProductList(values);
        }}
        initialValues={userChanges}
        enableReinitialize={productEdit ? true : false}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
          setFieldValue,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="title"
                value={values.title}
                onChange={handleChange}
                isInvalid={!!errors.title && touched.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="description"
                value={values.description}
                onChange={handleChange}
                isInvalid={!!errors.description && touched.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (Rs.)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={values.price}
                onChange={handleChange}
                isInvalid={!!errors.price && touched.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Discount (%)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter discountPercentage"
                name="discountPercentage"
                value={values.discountPercentage}
                onChange={handleChange}
                isInvalid={
                  !!errors.discountPercentage && touched.discountPercentage
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.discountPercentage}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock"
                name="stock"
                value={values.stock}
                onChange={handleChange}
                isInvalid={!!errors.stock && touched.stock}
              />
              <Form.Control.Feedback type="invalid">
                {errors.stock}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Select
                name="brand"
                onChange={handleChange}
                value={values.brand}
                isInvalid={!!errors.brand && touched.brand}
              >
                <option value="1">Apple</option>
                <option value="2">Samsung</option>
                <option value="3">Nokia</option>
                <option value="4">Redmi</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.brand}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                isValid ? toggleSidebar() : "";
              }}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductForm;
