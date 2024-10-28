import React from "react";
import "./HomeAdd.css";
import add1img from "../../../assets/images/ad1.jpg";
import add2img from "../../../assets/images/ad2.jpg";
import add3img from "../../../assets/images/ad3.jpg";
import add4img from "../../../assets/images/ad4.jpg";
import add5img from "../../../assets/images/ad5.jpg";

const HomeAdd = () => {
  return (
    <div className="photo-section">
      <img src={add1img} alt="Fashion 1" className="photo-item" />
      <img src={add2img} alt="Fashion 2" className="photo-item" />
      <img src={add3img} alt="Fashion 3" className="photo-item" />
      <img src={add4img} alt="Fashion 4" className="photo-item" />
      <img src={add5img} alt="Fashion 5" className="photo-item" />
    </div>
  );
};

export default HomeAdd;
