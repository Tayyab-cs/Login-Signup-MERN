import React, { useState } from "react";
import "./ForgetPassword.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ForgetPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preState) => ({ ...preState, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/login/forgetPassword",
        formData
      );

      if (response.status === 201) {
        alert("Kindly check your email for reset password.");
        navigate("/home", { replace: true });
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="img-container">
      <Form className="forget-password-bg">
        <Form.Label
          style={{ color: "blue", fontWeight: "bold", fontSize: "30px" }}
        >
          FORGET PASSWORD
        </Form.Label>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontWeight: "bold" }}>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            style={{ width: "300px" }}
            onChange={handleChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ backgroundColor: "blue", border: "none" }}
          onClick={handleClick}
        >
          SUBMIT
        </Button>
      </Form>
    </div>
  );
};
