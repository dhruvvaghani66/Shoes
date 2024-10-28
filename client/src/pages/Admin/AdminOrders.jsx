import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu/AdminMenu";
import Layout from "../../components/Layout/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth(); // Use auth without setAuth as you don't seem to be updating it

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders(); // Refresh the orders after status update
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders.map((o, i) => (
            <div className="border shadow mb-3" key={o._id}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <Select
                        onChange={(value) => handleChange(o._id, value)}
                        defaultValue={o?.status || "Not Process"}
                      >
                        {status.map((s, index) => (
                          <Option key={index} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td>{o?.buyer?.name}</td>
                    <td>{moment(o?.createdAt).fromNow()}</td>
                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="container">
                {o?.products?.map((p) => (
                  <div className="row mb-2 p-3 card flex-row" key={p._id}>
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        width="100"
                        height="200"
                      />
                    </div>
                    <div className="col-md-8">
                      <p>{p.name}</p>
                      <p>{p.description.substring(0, 30)}</p>
                      <p>Price: {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;

// import React, { useEffect, useState } from "react";
// import AdminMenu from "../../components/Layout/AdminMenu/AdminMenu";
// import Layout from "../../components/Layout/Layout/Layout";
// import { useAuth } from "../../context/auth";
// import moment from "moment";
// import axios from "axios";
// import { Select } from "antd";
// const { Option } = Select;

// const AdminOrders = () => {
//   const [status, setStatus] = useState([
//     "Not Process",
//     "Processing",
//     "Shipped",
//     "deliverd",
//     "cancel",
//   ]);
//   const [changeStatus, setCHangeStatus] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [auth, setAuth] = useAuth();

//   const getOrders = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
//       );
//       setStatus(data.map((o) => o.status));
//       setOrders(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) {
//       getOrders();
//     }
//   }, [auth?.token]);
//   console.log(orders);

//   const handleChange = async (orderId, value) => {
//     try {
//       const { data } = await axios.put(
//         `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
//         {
//           status: value,
//         }
//       );
//       getOrders();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="row">
//         <div className="col-md-3">
//           <AdminMenu />
//         </div>
//         <div className="col-md-9">
//           <h1 className="text-center">All Orders</h1>

//           {orders?.map((o, i) => {
//             console.log(`Order ID: ${o._id}, Status: ${o.status}`);
//             return (
//               <div className="border shadow">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th scope="col">#</th>
//                       <th scope="col">Status</th>
//                       <th scope="col">Buyer</th>
//                       <th scope="col"> date</th>
//                       <th scope="col">Payment</th>
//                       <th scope="col">Quantity</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>{i + 1}</td>
//                       <td>
//                         <Select
//                           // variant="light" // Change this according to your styling preference
//                           onChange={(value) => handleChange(o._id, value)}
//                           defaultValue={o?.status || "Not Process"}
//                         >
//                           {status.map((s, i) => (
//                             <Option key={i} value={s}>
//                               {s}
//                             </Option>
//                           ))}
//                         </Select>
//                       </td>
//                       <td>{o?.buyer?.name}</td>
//                       <td>{moment(o?.createAt).fromNow()}</td>
//                       <td>{o?.payment.success ? "Success" : "Failed"}</td>
//                       <td>{o?.products?.length}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <div className="container">
//                   {o?.products?.map((p, i) => (
//                     <div className="row mb-2 p-3 card flex-row" key={p._id}>
//                       <div className="col-md-4">
//                         <img
//                           src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
//                           className="card-img-top"
//                           alt={p.name}
//                           width="100px"
//                           height={"200px"}
//                         />
//                       </div>
//                       <div className="col-md-8">
//                         <p>{p.name}</p>
//                         <p>{p.description.substring(0, 30)}</p>
//                         <p>Price : {p.price}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminOrders;
