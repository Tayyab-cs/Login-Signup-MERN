import React, { useState } from "react";
import "./ResetPassword.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const [formData, setFormData] = useState({ newPassword: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preState) => ({ ...preState, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const { newPassword, confirmPassword } = formData;
      // console.log(`New Password: ${newPassword}`);
      // console.log(`Confirm Password: ${confirmPassword}`);

      // confirming newPassword before hitting the api.
      if (newPassword !== confirmPassword) {
        console.log(`confirm password doesn't matched.`);
        alert(`confirm password doesn't matched.`);
      }

      let token = window.location.href; // getting the url
      console.log(token);
      const getToken = token.split("token=")[1]; // splitting url to get token
      console.log(getToken);
      const config = {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      };
      console.log(`HEADER: ${config.headers.Authorization}`);

      const response = await axios.patch(
        "http://localhost:3001/api/login/resetPassword",
        formData,
        config
      );

      if (response.status === 201) {
        alert("Password Changed Successfully.");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="img-container">
      <Form className="reset-password-bg">
        <Form.Label
          style={{ color: "blue", fontWeight: "bold", fontSize: "30px" }}
        >
          RESET PASSWORD
        </Form.Label>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontWeight: "bold" }}>New Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            style={{ width: "300px" }}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontWeight: "bold" }}>
            Confirm Password
          </Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Enter confirm password"
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
