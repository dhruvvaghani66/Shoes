import React from "react";
import "./HomeCustomerReview.css"; // Ensure to import the CSS file
import nikelogo from "../../../assets/icons/nikelogo.svg";
import woodlogo from "../../../assets/icons/wood.svg";
import skelogo from "../../../assets/icons/scthe.svg";

const HomeCustomerReview = () => {
  return (
    <div className="customer-review-section">
      <h2 className="review-heading">Customer Reviews</h2>
      <p className="review-subheading">Give your reviews</p>

      <div className="review-cards-container">
        {/* First Review Card with Background Image */}
        <div className="review-card">
          <div className="customerinsidecard">
            <h5 className="review-product-name" style={{ color: "red" }}>
              Nike Air Max
            </h5>
            <p className="review-text">
              Super comfortable and stylish! Perfect for both workouts and
              casual wear.
            </p>
            <div className="customerlogo">
              <img src={nikelogo} alt="" />
            </div>
          </div>
        </div>

        {/* Second Review Card */}
        <div className="review-card2">
          <div className="customerinsidecard">
            <h5 className="review-product-name" style={{ color: "red" }}>
              Nike Air Max
            </h5>
            <p className="review-text">
              Super comfortable and stylish! Perfect for both workouts and
              casual wear.
            </p>
            <div className="customerlogo">
              <img src={woodlogo} alt="" />
            </div>
          </div>
        </div>

        {/* Third Review Card */}
        <div className="review-card3">
          <div className="customerinsidecard">
            <h5 className="review-product-name" style={{ color: "red" }}>
              Nike Air Max
            </h5>
            <p className="review-text">
              Super comfortable and stylish! Perfect for both workouts and
              casual wear.
            </p>
            <div className="customerlogo">
              <img src={skelogo} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCustomerReview;
