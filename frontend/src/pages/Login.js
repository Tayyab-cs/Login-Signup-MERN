import React, { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preState) => ({ ...preState, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/login/createUser",
        formData
      );

      if (response.status === 201) {
        alert("Login Successful");
        navigate("/home", { replace: true });
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="img-container">
      <Form className="login-bg">
        <Form.Label
          style={{ color: "blue", fontWeight: "bold", fontSize: "30px" }}
        >
          LOGIN
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
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
          Login
        </Button>
        <Link
          to="/signup"
          style={{
            color: "blue",
            textDecoration: "none",
            fontWeight: "lighter",
            marginTop: "5px",
          }}
        >
          Create new account
        </Link>
        <Link
          to="/forgetPassword"
          style={{
            color: "blue",
            textDecoration: "none",
            fontWeight: "lighter",
          }}
        >
          Forget password
        </Link>
      </Form>
    </div>
  );
};
