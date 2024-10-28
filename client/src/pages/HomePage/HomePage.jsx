import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Layout from "../../components/Layout/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import HomeBanner from "./HomeBanner/HomeBanner";
import HomeNewbanner from "./HomeNewbanner/HomeNewbanner";
import HomeCustomerReview from "./HomeCustomerReview/HomeCustomerReview";
import HomeAdd from "./HomeAdd/HomeAdd";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // getTotal count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div>
          <HomeBanner />
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <h1 className="headi text-center">FEATURE PRODUCT</h1>
            <p className="subfeature text-center ">
              Visit our website to see amazing product
            </p>
            <section className="products-section">
              <div className="d-flex flex-wrap  product-cards">
                {products?.map((p) => (
                  <div className="product-card" key={p._id}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="product-img"
                    />
                    <div className="product-details">
                      <p className="shoes-color">Shoes</p>
                      <h5 className="product-name">{p.name}</h5>
                      <p className="product-price">${p.price}</p>
                      <div className="button-row">
                        <button
                          className="btn buy-btn"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          Buy a Product
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <div className="m-2 p-3 text-center">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
        <div>
          <HomeNewbanner />
          <HomeCustomerReview />
          <HomeAdd />
        </div>
      </Layout>
    </>
  );
};

export default HomePage;

// import React, { useEffect, useState } from "react";
// import "./HomePage.css";
// import Layout from "../../components/Layout/Layout/Layout";
// import axios from "axios";
// import { Checkbox, Radio } from "antd";
// import { Prices } from "../../components/Prices";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../context/cart";
// import toast from "react-hot-toast";
// import HomeBanner from "./HomeBanner/HomeBanner";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useCart();
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [radio, setRadio] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // get all category
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/category/get-category`
//       );
//       if (data?.success) {
//         setCategories(data.category);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//   }, []);

//   useEffect(() => {
//     getTotal();
//   }, []);

//   // get products
//   const getAllProducts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
//       );
//       setLoading(false);
//       setProducts(data.products);
//     } catch (error) {
//       setLoading(false);
//       console.error(error);
//     }
//   };

//   // getTotal count
//   const getTotal = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/product-count`
//       );
//       setTotal(data?.total);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (page === 1) return;
//     loadMore();
//   }, [page]);

//   // load more
//   const loadMore = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
//       );
//       setLoading(false);
//       setProducts([...products, ...data?.products]);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   // filter by category
//   const handleFilter = (value, id) => {
//     let all = [...checked];
//     if (value) {
//       all.push(id);
//     } else {
//       all = all.filter((c) => c !== id);
//     }
//     setChecked(all);
//   };

//   useEffect(() => {
//     if (!checked.length || !radio.length) {
//       getAllProducts();
//     }
//   }, [checked.length, radio.length]);

//   useEffect(() => {
//     if (checked.length || radio.length) filterProduct();
//   }, [checked, radio]);

//   // get filtered product
//   const filterProduct = async () => {
//     try {
//       const { data } = await axios.post(
//         `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
//         { checked, radio }
//       );
//       setProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <Layout>
//         <div>
//           <HomeBanner />
//         </div>
//         <div className="row mt-3">
//           {/* <div className="col-md-2">
//             <div className="filter-section">
//               <h4 className="text-center">Filter By Category</h4>
//               <div className="d-flex flex-column">
//                 {categories?.map((c) => (
//                   <Checkbox
//                     key={c._id}
//                     onChange={(e) => handleFilter(e.target.checked, c._id)}
//                   >
//                     {c.name}
//                   </Checkbox>
//                 ))}
//               </div>

//               <h4 className="text-center mt-4">Filter By Prices</h4>
//               <div className="d-flex flex-column">
//                 <Radio.Group onChange={(e) => setRadio(e.target.value)}>
//                   {Prices?.map((p) => (
//                     <div key={p._id}>
//                       <Radio value={p.array}>{p.name}</Radio>
//                     </div>
//                   ))}
//                 </Radio.Group>
//               </div>

//               <div className="reset-button">
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => window.location.reload()}
//                 >
//                   RESET FILTERS
//                 </button>
//               </div>
//             </div>
//           </div> */}

//           <div className="col-md-9">
//             <h1 className="text-center">All Products</h1>
//             <div className="d-flex flex-wrap">
//               {products?.map((p) => (
//                 // <div className="card m-2" style={{ width: "21rem" }} key={p._id}>
//                 //   <img
//                 //     src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
//                 //     className="card-img-top"
//                 //     alt={p.name}
//                 //     style={{ width: "100%", height: "330px", objectFit: "cover" }}
//                 //   />
//                 //   <div className="card-body">
//                 //     {/* Name and Price in a row */}
//                 //     <div className="d-flex justify-content-between">
//                 //       <h5 className="card-title product-name">{p.name}</h5>
//                 //       <p className="card-text product-price">${p.price}</p>
//                 //     </div>
//                 //     {/* Description */}
//                 //     <p className="card-text product-description">
//                 //       {p.description.substring(0, 30)}...
//                 //     </p>
//                 //     {/* Buttons in a row with equal width */}
//                 //     <div className="d-flex">
//                 //       <button
//                 //         className="btn btn-primary w-50 me-1 btn-details"
//                 //         onClick={() => navigate(`/product/${p.slug}`)}
//                 //       >
//                 //         More Details
//                 //       </button>
//                 //       <button
//                 //         className="btn btn-secondary w-50 btn-add"
//                 //         onClick={() => {
//                 //           setCart([...cart, p]);
//                 //           toast.success("Item added to cart");
//                 //         }}
//                 //       >
//                 //         Add to Cart
//                 //       </button>
//                 //     </div>
//                 //   </div>
//                 // </div>
//                 <div
//                   className="card m-2"
//                   style={{ width: "21rem" }}
//                   key={p._id}
//                 >
//                   {/* Image at the top */}
//                   <img
//                     src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
//                     className="card-img-top"
//                     alt={p.name}
//                     style={{
//                       width: "100%",
//                       height: "330px",
//                       objectFit: "cover",
//                     }}
//                   />
//                   <div className="card-body text-center">
//                     {" "}
//                     {/* Centering the content */}
//                     {/* Name */}
//                     <h5 className="card-title product-name">{p.name}</h5>
//                     {/* Description */}
//                     <p className="card-text product-description">
//                       {p.description.substring(0, 30)}...
//                     </p>
//                     {/* Rating */}
//                     <div className="product-rating">
//                       {[...Array(5)].map((star, i) => (
//                         <i key={i} className="fas fa-star star-icon"></i>
//                       ))}
//                     </div>
//                     {/* Price */}
//                     <p className="card-text product-price">${p.price}</p>
//                     {/* Buttons in a row */}
//                     <div className="d-flex">
//                       <button
//                         className="btn btn-primary w-50 me-1 btn-details"
//                         onClick={() => navigate(`/product/${p.slug}`)}
//                       >
//                         More Details
//                       </button>
//                       <button
//                         className="btn btn-secondary w-50 btn-add"
//                         onClick={() => {
//                           setCart([...cart, p]);
//                           toast.success("Item added to cart");
//                         }}
//                       >
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="m-2 p-3">
//               {products && products.length < total && (
//                 <button
//                   className="btn btn-warning"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setPage(page + 1);
//                   }}
//                 >
//                   {loading ? "Loading ..." : "Loadmore"}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </Layout>
//     </>
//   );
// };

// export default HomePage;

// import React, { useEffect, useState } from "react";

// import Layout from "../../components/Layout/Layout/Layout";
// import axios from "axios";
// import { Checkbox, Radio } from "antd";
// import { Prices } from "../../components/Prices";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../context/cart";
// import toast from "react-hot-toast";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useCart();
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [radio, setRadio] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // get all category
//   const getAllCategory = async () => {
//     try {
//       // fetch categories
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/category/get-category`
//       );
//       if (data?.success) {
//         setCategories(data.category);
//         // getAllCategories();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//     // getTotal();
//     // eslint-disable-next-line
//   }, []);
//   useEffect(() => {
//     getTotal(); // moved this into a separate useEffect
//   }, []);

//   // get products
//   const getAllProducts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
//       );
//       setLoading(false);
//       setProducts(data.products);
//     } catch (error) {
//       setLoading(false);
//       console.error(error);
//     }
//   };

//   //getTotal count
//   const getTotal = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/product-count`
//       );
//       // console.log(data); // Check if data is coming correctly
//       // if (data?.success) {
//       //   setTotal(data.countTotal); // Ensure you're updating the state correctly
//       // }
//       setTotal(data?.total);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (page === 1) return;
//     loadMore();
//   }, [page]);

//   // load more
//   const loadMore = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
//       );
//       setLoading(false);
//       setProducts([...products, ...data?.products]);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   // filter by category
//   const handleFilter = (value, id) => {
//     let all = [...checked];
//     // const index = all.indexOf(id);
//     if (value) {
//       all.push(id);
//     } else {
//       all = all.filter((c) => c !== id);
//     }
//     setChecked(all);
//     // getAllProductsFiltered(newChecked);
//   };

//   useEffect(() => {
//     if (!checked.length || !radio.length) {
//       getAllProducts();
//     }
//   }, [checked.length, radio.length]);

//   useEffect(() => {
//     if (checked.length || radio.length) filterProduct();
//     // eslint-disable-next-line
//   }, [checked, radio]);

//   // get filterd product
//   const filterProduct = async () => {
//     try {
//       const { data } = await axios.post(
//         `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
//         { checked, radio }
//       );
//       setProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // // filter by price
//   // const handlePriceFilter = (price) => {
//   //   const filteredProducts = products.filter((p) => p.price <= price);
//   //   setProducts(filteredProducts);
//   // };

//   // useEffect(() => {
//   //   if (radio.length) {
//   //     handlePriceFilter(parseInt(radio));
//   //   }
//   // }, [radio]);

//   return (
//     <Layout>
//       <div className="row mt-3">
//         <div className="col-md-2">
//           <h4 className="text-center">Filter By Category</h4>
//           <div className="d-flex flex-column">
//             {categories?.map((c) => (
//               <Checkbox
//                 key={c._id}
//                 onChange={(e) => handleFilter(e.target.checked, c._id)}
//               >
//                 {c.name}
//                 {/* {c.checked && (
//                 <input
//                   type="checkbox"
//                   checked={c.checked}
//                   onChange={(e) => console.log(e)}
//                 />
//               )}
//               {c.checked && <span>{c.name}</span>} */}
//               </Checkbox>
//             ))}
//           </div>
//           {/* price filter */}
//           <h4 className="text-center mt-4">Filter By Prices</h4>
//           <div className="d-flex flex-column">
//             <Radio.Group onChange={(e) => setRadio(e.target.value)}>
//               {Prices?.map((p) => {
//                 return (
//                   <div key={p._id}>
//                     <Radio value={p.array}>{p.name}</Radio>;
//                   </div>
//                 );
//               })}
//             </Radio.Group>
//           </div>
//           {/* reset filter */}
//           <h4 className="text-center mt-4">Filter By Prices</h4>
//           <div className="d-flex flex-column">
//             <button
//               className="btn btn-danger"
//               onClick={() => window.location.reload()}
//             >
//               RESET FILTERS
//             </button>
//           </div>
//         </div>
//         <div className="col-md-9">
//           {/* {JSON.stringify(radio, null, 4)}   */}
//           <h1 className="text-center">All Products</h1>
//           <div className="d-flex flex-wrap">
//             {products?.map((p) => (
//               // <Link
//               //   key={p._id}
//               //   to={`/dashboard/admin/product/${p.slug}`}
//               //   className="product-link"
//               // >
//               <div className="card m-2" style={{ width: "18rem" }}>
//                 <img
//                   src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{p.name}</h5>
//                   <p className="card-text">
//                     {p.description.substring(0, 30)}...
//                   </p>
//                   <p className="card-text">${p.price}</p>

//                   <button
//                     class="btn btn-primary ms-1"
//                     onClick={() => navigate(`/product/${p.slug}`)}
//                   >
//                     More Details
//                   </button>
//                   <button
//                     class="btn btn-secondary ms-1"
//                     onClick={() => {
//                       setCart([...cart, p]);
//                       toast.success("Item added to cart");
//                     }}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//               // </Link>
//             ))}
//           </div>
//           {/* <div>{total ? `Total Products: ${total}` : "Loading..."}</div> */}
//           {/* <div>{typeof total !== 'undefined' ? `Total Products: ${total}` : 'Loading...'}</div> */}

//           {/* <div>{total}</div> */}
//           <div className="m-2 p-3">
//             {products && products.length < total && (
//               <button
//                 className="btn btn-warning"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setPage(page + 1);
//                 }}
//               >
//                 {loading ? "Loading ..." : "Loadmore"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default HomePage;
