import React, { useEffect, useState } from "react";
import "./CartPage.css";
import Layout from "../../components/Layout/Layout/Layout";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price with quantity
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.quantity; // Multiply price by quantity
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
      return "$0.00";
    }
  };

  // Conversion function to INR
  const convertToINR = (usdAmount) => {
    const conversionRate = 83; // Example conversion rate
    return (usdAmount * conversionRate).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  // Update product quantity
  const updateQuantity = (pid, quantity) => {
    const updatedCart = cart.map((item) =>
      item._id === pid ? { ...item, quantity: quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove product from cart
  const removeFromCart = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getToken();
    }
  }, [auth?.token]);

  // Handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        { nonce, cart }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]); // Clear cart
      navigate("/dashboard/user/orders");
      toast.success("Payment Successful!");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Payment Failed. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="container cart-container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="cart-title">
              {`Hello `} <span>{auth?.token && auth?.user.name}</span>
            </h1>
            <h4 className="cart-items-info">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your Cart Is Empty"}
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 cart-items">
            <div>
              <div className="cart-header">
                <div className="cart-header-item"></div>
                <div className="cart-header-item">Product</div>
                <div className="cart-header-item"></div>
                <div className="cart-header-item">Price</div>
                <div className="cart-header-item">Quantity</div>
                <div className="cart-header-item leftsubtotal">Subtotal</div>
                <div className="cart-header-item"></div>
              </div>
              <hr />
              {cart?.map((p) => (
                <div className="cartcenter" key={p._id}>
                  <div className="card mb-3 cart-item removecardborder">
                    <div className="row g-0 cartboxdetail">
                      <div className="col-md-2 cart-image">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="img-fluid rounded-start"
                        />
                      </div>
                      <div className="col-md-8 cart-details">
                        <div className="card-body">
                          <h5 className="cart-product-title">{p.name}</h5>
                          <p className="cart-product-desc">
                            {p.description.substring(0, 84)}...
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3 cart-price">
                        <b>${p.price.toFixed(2)}</b>
                      </div>
                      <div className="col-md-2 cart-quantity">
                        <select
                          className="form-select"
                          value={p.quantity}
                          onChange={(e) =>
                            updateQuantity(p._id, parseInt(e.target.value))
                          }
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map(
                            (num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="col-md-3 cart-total">
                        <b>${(p.price * p.quantity).toFixed(2)}</b>
                      </div>
                      {/* Remove Icon */}
                      <div className="col-md-1 cart-remove-icon">
                        <i
                          className="fas fa-trash-alt"
                          onClick={() => removeFromCart(p._id)}
                          style={{ cursor: "pointer", color: "red" }}
                        >
                          remove
                        </i>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-4 cart-summary">
            <h2 className="summary-title">Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            <small className="text-muted">
              (INR ~
              {convertToINR(
                cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
              )}
              )
            </small>
            {auth?.user?.address ? (
              <div className="address-box">
                <h4>Current Address</h4>
                <p>{auth?.user?.address}</p>
                <button
                  onClick={() => navigate("/dashboard/user/profile")}
                  className="btn btn-warning"
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="login-box">
                {auth?.token ? (
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please Login To Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-4">
              {!clientToken || !auth?.token || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

// import React, { useEffect, useState } from "react";
// import "./CartPage.css";
// import Layout from "../../components/Layout/Layout/Layout";
// import { useCart } from "../../context/cart";
// import { useAuth } from "../../context/auth";
// import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const CartPage = () => {
//   const [cart, setCart] = useCart();
//   const [auth, setAuth] = useAuth();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Calculate total price with quantity
//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.forEach((item) => {
//         total += item.price * item.quantity; // Multiply price by quantity
//       });
//       return total.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//       });
//     } catch (error) {
//       console.log(error);
//       return "$0.00";
//     }
//   };

//   // Conversion function to INR
//   const convertToINR = (usdAmount) => {
//     const conversionRate = 83; // Example conversion rate
//     return (usdAmount * conversionRate).toLocaleString("en-IN", {
//       style: "currency",
//       currency: "INR",
//     });
//   };

//   // Update product quantity
//   const updateQuantity = (pid, quantity) => {
//     const updatedCart = cart.map((item) =>
//       item._id === pid ? { ...item, quantity: quantity } : item
//     );
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   // Get payment gateway token
//   const getToken = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
//       );
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) {
//       getToken();
//     }
//   }, [auth?.token]);

//   // Handle payments
//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       const { nonce } = await instance.requestPaymentMethod();
//       const { data } = await axios.post(
//         `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
//         { nonce, cart }
//       );
//       setLoading(false);
//       localStorage.removeItem("cart");
//       setCart([]); // Clear cart
//       navigate("/dashboard/user/orders");
//       toast.success("Payment Successful!");
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//       toast.error("Payment Failed. Please try again.");
//     }
//   };

//   return (
//     <Layout>
//       <div className="container cart-container">
//         <div className="row">
//           <div className="col-md-12 text-center">
//             <h1 className="cart-title">{`Hello ${
//               auth?.token && auth?.user.name
//             }`}</h1>
//             <h4 className="cart-items-info">
//               {cart?.length
//                 ? `You have ${cart.length} items in your cart ${
//                     auth?.token ? "" : "please login to checkout"
//                   }`
//                 : "Your Cart Is Empty"}
//             </h4>
//           </div>
//         </div>

//         {/* Cart Header */}
//         {/* <div className="cart-header">
//           <div className="cart-header-item">Product</div>
//           <div className="cart-header-item">Price</div>
//           <div className="cart-header-item">Quantity</div>
//           <div className="cart-header-item">Subtotal</div>
//         </div>
//         <hr /> */}

//         <div className="row">
//           <div className="col-md-8 cart-items">
//             <div>
//               <div className="cart-header">
//                 <div className="cart-header-item"></div>
//                 <div className="cart-header-item"></div>
//                 <div className="cart-header-item">Product</div>
//                 <div className="cart-header-item">Price</div>
//                 <div className="cart-header-item">Quantity</div>
//                 <div className="cart-header-item">Subtotal</div>
//               </div>
//               {/* <hr /> */}
//               {cart?.map((p) => (
//                 <div
//                   className="card mb-3 cart-item removecardborder"
//                   key={p._id}
//                 >
//                   {/* <div> */}
//                   <div className="row g-0 cartcontentcenter">
//                     <div className="col-md-3 cart-image">
//                       <img
//                         src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
//                         alt={p.name}
//                         className="img-fluid rounded-start"
//                       />
//                     </div>
//                     <div className="col-md-6 cart-details">
//                       <div className="card-body">
//                         <h5 className="cart-product-title">{p.name}</h5>
//                         <p className="cart-product-desc">
//                           {p.description.substring(0, 60)}...
//                         </p>
//                       </div>
//                     </div>
//                     <div className="col-md-3 cart-price">
//                       <b>${p.price}</b>
//                     </div>
//                     <div className="col-md-2 cart-quantity">
//                       <select
//                         className="form-select"
//                         value={p.quantity}
//                         onChange={(e) =>
//                           updateQuantity(p._id, parseInt(e.target.value))
//                         }
//                       >
//                         {Array.from({ length: 10 }, (_, i) => i + 1).map(
//                           (num) => (
//                             <option key={num} value={num}>
//                               {num}
//                             </option>
//                           )
//                         )}
//                       </select>
//                     </div>
//                     <div className="col-md-3 cart-total">
//                       <b>${(p.price * p.quantity).toFixed(2)}</b>
//                     </div>
//                     <hr className="cartdivider" />
//                   </div>
//                 </div>
//                 // </div>
//               ))}
//             </div>
//           </div>
//           <div className="col-md-4 cart-summary">
//             <h2 className="summary-title">Cart Summary</h2>
//             <p>Total | Checkout | Payment</p>
//             <hr />
//             <h4>Total: {totalPrice()}</h4>
//             <small className="text-muted">
//               (INR ~
//               {convertToINR(
//                 cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
//               )}
//               )
//             </small>
//             {auth?.user?.address ? (
//               <div className="address-box">
//                 <h4>Current Address</h4>
//                 <p>{auth?.user?.address}</p>
//                 <button
//                   onClick={() => navigate("/dashboard/user/profile")}
//                   className="btn btn-warning"
//                 >
//                   Update Address
//                 </button>
//               </div>
//             ) : (
//               <div className="login-box">
//                 {auth?.token ? (
//                   <button
//                     className="btn btn-warning"
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 ) : (
//                   <button
//                     className="btn btn-warning"
//                     onClick={() => navigate("/login", { state: "/cart" })}
//                   >
//                     Please Login To Checkout
//                   </button>
//                 )}
//               </div>
//             )}
//             <div className="mt-4">
//               {!clientToken || !auth?.token || !cart?.length ? (
//                 ""
//               ) : (
//                 <>
//                   <DropIn
//                     options={{
//                       authorization: clientToken,
//                       paypal: {
//                         flow: "vault",
//                       },
//                     }}
//                     onInstance={(instance) => setInstance(instance)}
//                   />
//                   <button
//                     className="btn btn-primary"
//                     onClick={handlePayment}
//                     disabled={loading || !instance || !auth?.user?.address}
//                   >
//                     {loading ? "Processing ..." : "Make Payment"}
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;

// import React, { useEffect, useState } from "react";
// import Layout from "../components/Layout/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const CartPage = () => {
//   const [cart, setCart] = useCart();
//   const [auth, setAuth] = useAuth();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   //total price
//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         total = total + item.price;
//       });
//       return total.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //detele item
//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //get payment gateway token
//   const getToken = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
//       );
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getToken();
//   }, [auth?.token]);

//   //handle payments
//   const handlePayment = async () => {};

//   return (
//     <Layout>
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12">
//             <h1 className="text-center bg-light p-2 mb-1">
//               {`Hello ${auth?.token && auth?.user.name}`}
//             </h1>
//             <h4 className="text-center">
//               {cart?.length
//                 ? `You Have ${cart.length} items in your cart ${
//                     auth?.token ? "" : "please login to checkout"
//                   }`
//                 : "Your Cart Is Empty"}
//             </h4>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-8">
//             <div className="row">
//               {cart?.map((p) => (
//                 <div className="row mb-2 card flex-row">
//                   <div className="col-md-4">
//                     <img
//                       src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
//                       className="card-img-top"
//                       alt={p.name}
//                       width="100%"
//                       height={"290px"}
//                     />
//                   </div>
//                   <div className="col-md-4">
//                     <h4>{p.name}</h4>
//                     <p>{p.description.substring(0, 30)}</p>
//                     <p>Price : {p.price}</p>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => removeCartItem(p._id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="col-md-4 text-center">
//             <h2>Cart Summary</h2>
//             <p>Total | Chekout | Payment</p>
//             <hr />
//             <h4>Total : {totalPrice()}</h4>
//             {auth?.user?.address ? (
//               <>
//                 <div className="mb-3">
//                   <h4>Current Address</h4>
//                   <h5>{auth?.user?.address}</h5>
//                   <button
//                     onClick={() => navigate("/dashboard/user/profile")}
//                     className="btn btn-warning"
//                   >
//                     Update Address
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="mb-3">
//                 {auth?.token ? (
//                   <button
//                     className="btn btn-warning"
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 ) : (
//                   <button
//                     className="btn btn-warning"
//                     onClick={() => navigate("/login", { state: "/cart" })}
//                   >
//                     Please Login To Checkout
//                   </button>
//                 )}
//               </div>
//             )}
//             <div className="mt-2">
//               <DropIn
//                 options={{
//                   authorization: clientToken,
//                   paypal: {
//                     flow: "vault",
//                   },
//                   // onReady: () => {
//                   //   setLoading(false);
//                   // },
//                   // onError: (error) => {
//                   //   console.error("Error loading PayPal", error);
//                   // },
//                 }}
//                 onInstance={(instance) => setInstance(instance)}
//               />
//               <button
//                 className="btn btn-primary"
//                 onClick={handlePayment}
//                 // disabled={loading ||!instance || !auth?.user?.address}
//               >
//                 Make Payment
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;
