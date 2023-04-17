import React from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="img-container">
      <Form className="home-bg">
        <Form.Label
          style={{ color: "blue", fontWeight: "bold", fontSize: "30px" }}
        >
          WELCOME TO HOME
        </Form.Label>

        <Link
          to="/signup"
          style={{
            color: "blue",
            textDecoration: "none",
            fontWeight: "lighter",
            marginTop: "5px",
          }}
        >
          GO TO SIGNUP
        </Link>
        <Link
          to="/login"
          style={{
            color: "blue",
            textDecoration: "none",
            fontWeight: "lighter",
          }}
        >
          GO TO LOGIN
        </Link>
      </Form>
    </div>
  );
};
