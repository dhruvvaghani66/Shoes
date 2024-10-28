import React from "react";
import "./HomeBanner.css";
// import HomeBannerImg from "../../../assets/images/homeBanner.png";
// import BannerImg from "../../../assets/images/stylebanner.png"; // Placeholder for first card banner image
// import EnergyBannerImg from "../../../assets/images/energybanner.png"; // Placeholder for second card banner image

const HomeBanner = () => {
  return (
    <>
      <section className="home-banner">
        <div className="banner-content">
          <h4>NIKE - NEW ARRIVALS</h4>
          <div className="shoesname">
            <h2>THE AIR</h2>
            <h2>JORDAN 1</h2>
            <h2>MIN</h2>
          </div>
          <h3>$190</h3>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </section>

      {/* Card Banner Section */}
      <section className="card-banners">
        {/* First Card Banner */}
        <div className="card-banner first-banner">
          <div className="text-section">
            <div className="discount-box">40% OFF</div>
            <h2>STYLE MEETS</h2>
            <h2>SUBSTANCE</h2>
            <p>Breathable perforated toe stitched stealth</p>
            <button className="find-shoe-btn">Find Your Shoe</button>
          </div>
        </div>

        {/* Second Card Banner */}
        <div className="card-banner second-banner">
          <div className="text-section1">
            <div className="discount-box1">50% OFF</div>
            <h3>ENERGY TAKES</h3>
            <h3>OVER</h3>
            <button className="view-campaign-btn">View Campaign</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeBanner;

// import React from "react";

// import "./HomeBanner.css";
// import HomeBannerImg from "../../../assets/images/homeBanner.png";

// const HomeBanner = () => {
//   return (
//     <>
//       <section className="home-banner">
//         <div className="banner-content">
//           <h4>NIKE - NEW ARRIVALS</h4>
//           <div className="shoesname">
//             <h2>THE AIR</h2>
//             <h2>JORDAN 1</h2>
//             <h2>MIN</h2>
//           </div>
//           <h3>$190</h3>
//           <button className="shop-now-btn">Shop Now</button>
//         </div>
//       </section>
//     </>
//   );
// };

// export default HomeBanner;
