import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import myprofile from "../../../assets/icons/profile.svg";
import mylike from "../../../assets/icons/heart.svg";
import mycart from "../../../assets/icons/cart.svg";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";
import useCategory from "../../../hooks/useCategory";
import { useCart } from "../../../context/cart";
import { Badge } from "antd";
import SearchInput from "../../Form/Searchinput";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();

  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully!");
  };
  const handleNavLinkClick = (path) => {
    setActiveLink(path);
  };

  const handleIconClick = (path) => {
    setActiveLink(path);
    setDropdownOpen(false); // Close dropdown when an icon is clicked
  };

  return (
    <>
      {/* Show message when not logged in */}
      {!auth.user && (
        <div className="login-message">
          <p>You are not logged in. Please log in.</p>
        </div>
      )}
      <div className="mainnavbar">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="roow1">
            <div className="container-fluid header-container">
              <div className="main-nav-group">
                {/* First Row */}
                <div className="navbar-left">
                  <Link to="/" className="navbar-brand">
                    <img
                      src="/images/shoeslogo.png"
                      alt="Logo"
                      className="logo-img"
                    />
                  </Link>
                  <div className="divider" />
                </div>

                {/* Search Section */}
                <div className="searchbar">
                  <SearchInput />

                  {/* <div className="search-box">
                    <i className="fas fa-search search-icon" />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search for products..."
                    />
                    <button className="btn search-btn">Search</button>
                  </div> */}
                </div>

                {/* Contact and Free Shipping Section */}
                <div className="navbar-info">
                  <div className="contact-info1">
                    <h5 className="header-text bold-text">+91 800456789</h5>
                    <span className="sub-text small-text">CALL US FREE</span>
                  </div>
                  <div className="divider" />
                  <div className="shipping-info">
                    <h5 className="header-text bold-text">FREE SHIPPING</h5>
                    <span className="sub-text small-text">
                      ON ORDERS OVER $150.00
                    </span>
                  </div>
                </div>

                {/* Right Side Icons */}
                <div className="navbar-right">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {/* If user is logged in, show username with dropdown */}
                    {auth?.user ? (
                      <li className="nav-item dropdown">
                        <NavLink
                          className="nav-link dropdown-toggle"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {auth?.user?.name}
                        </NavLink>
                        <ul className="dropdown-menu">
                          <li>
                            <NavLink
                              to={`/dashboard/${
                                auth?.user?.role === 1 ? "admin" : "user"
                              }`}
                              className="dropdown-item"
                            >
                              Dashboard
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              onClick={handleLogout}
                              to="/login"
                              className="dropdown-item"
                            >
                              Logout
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      <>
                        {/* <li className="nav-item">
                          <NavLink
                            to="/register"
                            className="nav-link"
                            onClick={() => handleNavLinkClick("/register")}
                          >
                            Register
                          </NavLink>
                        </li> */}
                        <li className="nav-item">
                          <NavLink
                            to="/login"
                            className="nav-link"
                            onClick={() => handleNavLinkClick("/login")}
                          >
                            Sign In
                          </NavLink>
                        </li>
                      </>
                    )}

                    {/* Icons: Wishlist and Cart */}
                    <li className="nav-item">
                      <Badge count={0} showZero>
                        <NavLink
                          to="/wishlist"
                          className={`nav-link ${
                            activeLink === "/wishlist" ? "active" : ""
                          }`}
                          onClick={() => handleIconClick("/wishlist")}
                        >
                          <img
                            src={mylike}
                            alt="My Icon"
                            style={{ width: "1.5rem", height: "1.5rem" }}
                          />
                        </NavLink>
                      </Badge>
                    </li>
                    <li className="nav-item">
                      <Badge count={cart?.length} showZero>
                        <NavLink
                          to="/cart"
                          className={`nav-link ${
                            activeLink === "/cart" ? "active" : ""
                          }`}
                          onClick={() => handleIconClick("/cart")}
                        >
                          <img
                            src={mycart}
                            alt="My Icon"
                            style={{ width: "1.5rem", height: "1.5rem" }}
                          />
                        </NavLink>
                      </Badge>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="roow2">
            <div className="category-nav-group">
              <div className="category-nav">
                <ul className="category-list">
                  {categories.map((category) => (
                    <li key={category._id}>
                      <NavLink
                        to={`/category/${category.slug}`}
                        className={`category-link ${
                          activeLink === `/category/${category.slug}`
                            ? "active"
                            : ""
                        }`}
                      >
                        {category.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                {/* <ul className="category-list">
                  {categories.map((category) => (
                    <li key={category._id}>
                      <NavLink
                        to={`/category/${category.slug}`}
                        className="category-link"
                      >
                        {category.name}
                      </NavLink>
                    </li>
                  ))}
                </ul> */}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;

// import React, { useState } from "react";
// import "./Header.css";
// import { Link, NavLink } from "react-router-dom";
// import { useAuth } from "../../../context/auth";
// import toast from "react-hot-toast";
// import Searchinput from "../../Form/Searchinput";
// import useCategory from "../../../hooks/useCategory";
// import { useCart } from "../../../context/cart";
// import { Badge } from "antd";

// const Header = () => {
//   const [auth, setAuth] = useAuth();
//   const categories = useCategory();
//   const [cart] = useCart();

//   const handleLogout = () => {
//     setAuth({
//       ...auth,
//       user: null,
//       token: "",
//     });
//     localStorage.removeItem("auth");
//     toast.success("Logged out successfully!");
//   };

//   const [activeLink, setActiveLink] = useState("/");

// const handleNavLinkClick = (path) => {
//   setActiveLink(path);
// };

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div className="container-fluid">
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarTogglerDemo01"
//             aria-controls="navbarTogglerDemo01"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>
//           <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//             <Link to="/" className="navbar-brand">
//               🛒 Shoes App
//             </Link>
//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//               <Searchinput />
//               <li className="nav-item">
//                 <NavLink
//                   to="/"
//                   className={`nav-link ${activeLink === "/" ? "active" : ""}`}
//                   onClick={() => handleNavLinkClick("/")}
//                 >
//                   Home
//                 </NavLink>
//               </li>
//               <li className="nav-item dropdown">
//                 <Link
//                   className="nav-link dropdown-toggle"
//                   to={"/categories"}
//                   data-bs-toggle="dropdown"
//                 >
//                   Categories
//                 </Link>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <Link className="dropdown-item" to={"/categories"}>
//                       Categories
//                     </Link>
//                   </li>
//                   {categories?.map((c) => (
//                     <li key={c._id}>
//                       <Link
//                         className="dropdown-item"
//                         to={`/category/${c.slug}`}
//                       >
//                         {c.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </li>

//               {/* <li className="nav-item">
//                 <NavLink
//                   to="/category"
//                   className={`nav-link ${
//                     activeLink === "/category" ? "active" : ""
//                   }`}
//                   onClick={() => handleNavLinkClick("/category")}
//                 >
//                   Category
//                 </NavLink>
//               </li> */}
//               {/* here first condition if not user then show login OR register and if user login then second condition show logot button */}
//               {!auth.user ? (
//                 <>
//                   <li className="nav-item">
//                     <NavLink
//                       to="/register"
//                       className={`nav-link ${
//                         activeLink === "/register" ? "active" : ""
//                       }`}
//                       onClick={() => handleNavLinkClick("/register")}
//                     >
//                       Register
//                     </NavLink>
//                   </li>
//                   <li className="nav-item">
//                     <NavLink
//                       to="/login"
//                       className={`nav-link ${
//                         activeLink === "/login" ? "active" : ""
//                       }`}
//                       onClick={() => handleNavLinkClick("/login")}
//                     >
//                       Login
//                     </NavLink>
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li className="nav-item dropdown">
//                     <NavLink
//                       className="nav-link dropdown-toggle"
//                       href="#"
//                       role="button"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                     >
//                       {auth?.user?.name}
//                     </NavLink>
//                     <ul className="dropdown-menu">
//                       <li>
//                         <NavLink
//                           to={`/dashboard/${
//                             auth?.user?.role === 1 ? "admin" : "user"
//                           }`}
//                           className="dropdown-item"
//                         >
//                           Dashboard
//                         </NavLink>
//                       </li>
//                       <li>
//                         <NavLink
//                           onClick={handleLogout}
//                           to="/login"
//                           className={`className="dropdown" ${
//                             activeLink === "/login" ? "active" : ""
//                           }`}
//                         >
//                           Logout
//                         </NavLink>
//                       </li>
//                     </ul>
//                   </li>
//                 </>
//               )}
//               <li className="nav-item">
//                 <Badge count={cart?.length} showZero>
//                   <NavLink
//                     to="/cart"
//                     className={`nav-link ${
//                       activeLink === "/cart" ? "active" : ""
//                     }`}
//                     onClick={() => handleNavLinkClick("/cart")}
//                   >
//                     Cart
//                   </NavLink>
//                 </Badge>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Header;
