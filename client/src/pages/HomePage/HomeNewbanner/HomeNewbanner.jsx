import React from "react";
import "./HomeNewbanner.css";
import banner1 from "../../../assets/images/homephantom.png";
import banner2 from "../../../assets/images/homeodysse.png";
const HomeNewbanner = () => {
  return (
    <div className="home-newbanner">
      <div className="image-container">
        <img src={banner1} alt="First Banner" className="banner-image" />
        <img src={banner2} alt="Second Banner" className="banner-image1" />
      </div>
    </div>
  );
};

export default HomeNewbanner;
