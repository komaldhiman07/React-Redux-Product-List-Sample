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
import styles from "./AddUser.module.scss";
import { string } from "yup/lib/locale";
import { IUser, IUserData } from "../../interfaces";
interface IProps {
  userEdit: IUser | null;
  updateUserList: (values: IUserData) => void;
  toggleSidebar: () => void;
}
const AddUserForm = ({ userEdit, updateUserList, toggleSidebar }: IProps) => {
  const [radioValue, setRadioValue] = useState(userEdit ? userEdit.gender : "");
  const [userChanges, setUserChanges] = useState<IUserData>({
    id: NaN,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    university: "",
    age: NaN,
    blood: "",
    birth: "",
    address: "",
    gender: "",
    image: "",
  });
  // const submitForm = () => {
  //   handleUpdate(userEdit);
  // };
  const phoneRegx = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .min(6, "Minimum 6 char")
      .max(16, "Maximum 16 char")
      .matches(phoneRegx, "Phone number is not valid")
      .required(),
    university: yup.string().required(),
    age: yup
      .string()
      .min(1, "Minimum 1 char")
      .max(3, "Maximum 3 char")
      .required(),
    blood: yup.string().ensure().required(),
    birth: yup.string().required(),
    address: yup.string().required(),
    gender: yup.string().ensure().required(),
    image: yup.string().ensure().required(),
  });
  const Gender = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
    { name: "Other", value: "other" },
  ];
  useEffect(() => {
    if (userEdit) {
      setUserChanges({
        id: userEdit?.id,
        firstName: userEdit?.firstName,
        lastName: userEdit?.lastName,
        email: userEdit?.email,
        phone: userEdit?.phone,
        university: userEdit?.university,
        age: userEdit?.age,
        blood: "0",
        birth: userEdit?.birthDate || "",
        address: userEdit?.address?.address,
        gender: userEdit?.gender,
        image: userEdit?.image,
      });
    }
  }, [userEdit]);

  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={(values: IUserData) => {
          updateUserList(values);
        }}
        initialValues={userChanges}
        enableReinitialize={userEdit ? true : false}
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
            <Row className="g-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    isInvalid={!!errors.firstName && touched.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    isInvalid={!!errors.lastName && touched.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email && touched.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone number"
                name="phone"
                value={values.phone}
                minLength={9}
                maxLength={12}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.phone && touched.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>University</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter university"
                name="university"
                value={values.university}
                onChange={handleChange}
                isInvalid={!!errors.university && touched.university}
              />
              <Form.Control.Feedback type="invalid">
                {errors.university}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={values.age}
                onChange={handleChange}
                isInvalid={!!errors.age && touched.age}
                placeholder="Write age"
              />
              <Form.Control.Feedback type="invalid">
                {errors.age}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <div>
                <ButtonGroup>
                  {Gender.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant="outline-primary"
                      name="gender"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => {
                        setFieldValue("gender", e.currentTarget.value);
                        setRadioValue(e.currentTarget.value);
                      }}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.gender}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter university"
                name="birth"
                value={values.birth}
                onChange={handleChange}
                isInvalid={!!errors.birth && touched.birth}
              />
              <Form.Control.Feedback type="invalid">
                {errors.birth}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Blood Group</Form.Label>
              <Form.Select
                name="blood"
                onChange={handleChange}
                value={values.blood}
                isInvalid={!!errors.blood && touched.blood}
              >
                <option value="1">A-</option>
                <option value="2">A+</option>
                <option value="3">B-</option>
                <option value="4">B+</option>
                <option value="5">AB-</option>
                <option value="6">AB+</option>
                <option value="7">O-</option>
                <option value="8">O+</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.blood}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={values.address}
                onChange={handleChange}
                isInvalid={!!errors.address && touched.address}
                aria-label="Write Address"
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={isValid ? toggleSidebar : ""}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddUserForm;
