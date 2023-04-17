import React, { useState } from "react";
import "./Signup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preState) => ({ ...preState, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/signup/createUser",
        formData
      );

      if (response.status === 201) {
        alert("User Created Successfully.");
        navigate("/home", { replace: true });
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  return (
    <div className="img-container">
      <Form className="signup-bg">
        <Form.Label
          style={{ color: "blue", fontWeight: "bold", fontSize: "30px" }}
        >
          SIGN UP
        </Form.Label>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label style={{ fontWeight: "bold" }}>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter name"
            style={{ width: "300px" }}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
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
            value={formData.password}
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
          Signup
        </Button>
        <Link
          to="/login"
          style={{
            color: "blue",
            textDecoration: "none",
            fontWeight: "lighter",
            marginTop: "5px",
          }}
        >
          Already have an account.
        </Link>
        <Link
          to=""
          style={{
            color: "blue",
            textDecoration: "none",
            fontWeight: "lighter",
          }}
        >
          Change password.
        </Link>
      </Form>
    </div>
  );
};
