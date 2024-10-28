import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import UserMenu from "../../components/Layout/AdminMenu/UserMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]); // Ensure orders is initialized as an array
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      // Check if 'data' has an 'orders' field and that it's an array
      if (Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        console.error("Unexpected data format:", data);
        setOrders([]); // If the data is not as expected, set an empty array
      }
    } catch (error) {
      console.log(error);
      setOrders([]); // In case of an error, set an empty array to prevent map errors
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders.length === 0 ? (
              <p>No orders found</p>
            ) : (
              orders.map((o, i) => {
                return (
                  <div className="border shadow" key={o._id}>
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
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createAt).fromNow()}</td>
                          <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {o?.products?.map((p, i) => (
                        <div className="row mb-2 p-3 card flex-row" key={p._id}>
                          <div className="col-md-4">
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                              width="100px"
                              height={"200px"}
                            />
                          </div>
                          <div className="col-md-8">
                            <p>{p.name}</p>
                            <p>{p.description.substring(0, 30)}</p>
                            <p>Price : {p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

// import React, { useEffect, useState } from "react";
// import Layout from "../../components/Layout/Layout/Layout";
// import UserMenu from "../../components/Layout/AdminMenu/UserMenu";
// import axios from "axios";
// import { useAuth } from "../../context/auth";
// import moment from '../../../node_modules/moment/dist/locale/ar-kw';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [auth, setAuth] = useAuth();

//   const getOrders = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/auth/orders`
//       );
//       setOrders(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) getOrders();
//   }, [auth?.token]);

//   return (
//     <Layout>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <UserMenu />
//           </div>
//           <div className="col-md-9">
//             <h1 className="text-center">All Orders</h1>
//             {/* <p>{JSON.stringify(orders, null, 4)}</p> */}
//             {orders?.map((o, i) => {
//               return (
//                 <div className="border shadow" key={o._id}>
//                   <table className="table">
//                     <thead>
//                       <tr>
//                         <th scope="col">#</th>
//                         <th scope="col">Status</th>
//                         <th scope="col">Buyer</th>
//                         <th scope="col">date</th>
//                         <th scope="col">Payment</th>
//                         <th scope="col">Quantity</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <th>{i + 1}</th>
//                         <th>{o?.status}</th>
//                         <th>{o?.buyer?.name}</th>
//                         <th>{o?.user.name}</th>
//                         <th>{new Date(o.createdAt).toLocaleString()}</th>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Orders;
