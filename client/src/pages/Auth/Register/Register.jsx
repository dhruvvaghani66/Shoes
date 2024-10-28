import React, { useState } from "react";
import "./register.css";
import Layout from "../../../components/Layout/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import registerlogoimg from "../../../assets/images/www.svg"; // Import your SVG logo

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to register");
    }
  };

  return (
    <div className="register-bg">
      <Layout>
        <div className="for-container">
          <div className="register-card">
            <img src={registerlogoimg} alt="Logo" className="registerlogo" />
            {/* <div className="link-container">
              <NavLink to="/login" className="link" activeClassName="active">
                SIGN IN
              </NavLink>
              <span className="separator">|</span>
              <NavLink to="/register" className="link" activeClassName="active">
                SIGN UP
              </NavLink>
            </div>
            <form onSubmit={handleSubmit}></form> */}
            <div className="link-container">
              <NavLink to="/login" className="link" activeClassName="active">
                SIGN IN
              </NavLink>
              <span className="separator">|</span>
              <NavLink to="/register" className="link" activeClassName="active">
                SIGN UP
              </NavLink>
            </div>
            <form onSubmit={handleSubmit}>
              <center>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control1"
                    placeholder="Enter Your Name"
                    required
                  />
                </div>
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
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control1"
                    placeholder="Enter Your Phone"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control1"
                    placeholder="Enter Your Address"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="form-control1"
                    placeholder="What is your Favorite Sports?"
                    required
                  />
                </div>
                <button type="submit" className="btn sign-up-btn">
                  SIGN UP
                </button>
              </center>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import "./register.css";
// import Layout from "../../../components/Layout/Layout/Layout";
// import toast, { Toaster } from "react-hot-toast";

// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const navigate = useNavigate();

//   // form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_API}/api/v1/auth/register`,
//         { name, email, password, phone, address }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate("/login");
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
//       <div className="register">
//         <h1>Register</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail1"
//               placeholder="Enter Your Name"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail1"
//               placeholder="Enter Your Email"
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
//             <input
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail1"
//               placeholder="Enter Your Phone"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail1"
//               placeholder="Enter Your Address"
//               required
//             />
//           </div>

//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default Register;
