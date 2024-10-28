import React from "react";
import "./PagenotFound.css";
// import Layout from "../../components/Layout/Layout/Layout";
import { Link } from "react-router-dom";
import { Layout } from "antd";

const PagenotFound = () => {
  return (
    <Layout>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <p className="pnf-heading">Oops ! Page Not Found.</p>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PagenotFound;
