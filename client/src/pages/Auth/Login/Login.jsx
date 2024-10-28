import React, { useState } from "react";
import "./Login.css"; // Import the CSS file
import loginlogoimg from "../../../assets/images/www.svg"; // Import your logo
import Layout from "../../../components/Layout/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to login");
    }
  };

  return (
    <div className="login-bg">
      <Layout>
        <div className="for-container">
          <div className="login-card">
            <img src={loginlogoimg} alt="Logo" className="loginlogo" />
            <div className="link-container">
              {/* NavLink for Sign In */}
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
              >
                SIGN IN
              </NavLink>
              <span className="separator">|</span>

              {/* NavLink for Sign Up */}
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
              >
                SIGN UP
              </NavLink>
            </div>
            <form onSubmit={handleSubmit}>
              <center>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control1"
                    placeholder="Enter Your Email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control1"
                    placeholder="Enter Your Password"
                    required
                  />
                </div>
                <button type="submit" className="btn sign-in-btn">
                  SIGN IN
                </button>
              </center>
              <div className="forgot-password">
                <NavLink to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import Layout from "../../../components/Layout/Layout/Layout";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useAuth } from "../../../context/auth";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [auth, setAuth] = useAuth();

//   const navigate = useNavigate();
//   const location = useLocation();

//   // form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_API}/api/v1/auth/login`,
//         { email, password }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//         setAuth({
//           user: res.data.user,
//           token: res.data.token,
//         });
//         // localstorage use for saved data on browser and we can used as to show data on page refresh as well
//         localStorage.setItem("auth", JSON.stringify(res.data));
//         navigate(location.state || "/");
//         // window.location.href = "/login";
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to register");
//     }
//   };
//   return (
//     <Layout>
//       <div className="form-container ">
//         <form onSubmit={handleSubmit}>
//           <h4 className="title">LOGIN FORM</h4>

//           <div className="mb-3">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail1"
//               placeholder="Enter Your Email "
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control"
//               id="exampleInputPassword1"
//               placeholder="Enter Your Password"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={() => {
//                 navigate("/forgot-password");
//               }}
//             >
//               Forgot Password
//             </button>
//           </div>
//           <button type="submit" className="btn btn-primary">
//             LOGIN
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import Layout from "../../../components/Layout/Layout/Layout";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // const [answer, setAnswer] = useState("");
//   const navigate = useNavigate();

//   // form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_API}/api/v1/auth/login`,
//         { email, password }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate("/");
//         // window.location.href = "/login";
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to register");
//     }
//   };
//   return (
//     <Layout>
//       <div className="form-container ">
//         <form onSubmit={handleSubmit}>
//           <h4 className="title">LOGIN FORM</h4>

//           <div className="mb-3">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail1"
//               placeholder="Enter Your Email "
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control"
//               id="exampleInputPassword1"
//               placeholder="Enter Your Password"
//               required
//             />
//           </div>

//           {/* <div className="mb-3">
//           <input
//             type="text"
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//             className="form-control"
//             id="exampleInputEmail1"
//             placeholder="What is Your Favorite sports"
//             required
//           />
//         </div> */}
//           <button type="submit" className="btn btn-primary">
//             LOGIN
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default Login;
