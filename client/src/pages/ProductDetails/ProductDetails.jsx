import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import Layout from "../../components/Layout/Layout/Layout";
import axios from "axios";
import mylike from "../../assets/icons/heart.svg";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../context/cart";

// Import local thumbnail images
import thumb1 from "../../assets/images/orabge0.jpg";
import thumb2 from "../../assets/images/orange2.jpg";
import thumb3 from "../../assets/images/orange3.jpg";
import thumb4 from "../../assets/images/orange1.jpg";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("description"); // Tab state

  // New state for main image (default to the first thumbnail)
  const [mainImage, setMainImage] = useState(thumb1);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      // Set main image to product image from API (optional)
      setMainImage(
        `${process.env.REACT_APP_API}/api/v1/product/product-photo/${data?.product._id}`
      );
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="product-details-container row mt-4">
        <div className="col-md-6 d-flex flex-column removespace">
          <div className="main-image">
            {/* Main Image Display */}
            <img
              src={mainImage}
              className="product-detail-img"
              alt={product.name}
            />
          </div>

          {/* Thumbnail Image Preview */}
          <div className="image-preview-column justify-content-between">
            {/* Use local thumbnails */}
            <div
              className="small-image-box"
              onMouseEnter={() => setMainImage(thumb1)}
            >
              <img src={thumb1} alt="Thumbnail 1" />
            </div>
            <div
              className="small-image-box"
              onMouseEnter={() => setMainImage(thumb2)}
            >
              <img src={thumb2} alt="Thumbnail 2" />
            </div>
            <div
              className="small-image-box"
              onMouseEnter={() => setMainImage(thumb3)}
            >
              <img src={thumb3} alt="Thumbnail 3" />
            </div>
            <div
              className="small-image-box"
              onMouseEnter={() => setMainImage(thumb4)}
            >
              <img src={thumb4} alt="Thumbnail 4" />
            </div>
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="col-md-6 product-details-content">
          <div className="shoesmartname">
            <h2 className="brand-name">Shoesmart</h2>
            <h1 className="product-namedetail">{product.name}</h1>
          </div>
          <h3 className="product-price">${product.price}</h3>
          <div className="tax">
            <p className="inclusive-text">Inclusive of all taxes</p>
            <p className="inclusive-text">
              (Also includes all applicable duties)
            </p>
          </div>

          {/* Size Selection */}
          <div className="rigthsizeselect">
            <div className="size-selection">
              <div className="d-flex justify-content-between align-items-center">
                <p className="select-size-text">Select Size</p>
                <p className="size-guide-text">Size Guide</p>
              </div>
              <div className="size-boxes">
                {[...Array(9)].map((_, index) => (
                  <div key={index} className="size-box">
                    {index === 0 ? "UK 6 (EU 40)" : `UK ${6 + index * 0.5}`}
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="action-buttons ">
              <button
                className="btn add-to-cart-btn"
                onClick={() => {
                  const existingProduct = cart.find(
                    (item) => item._id === product._id
                  );
                  if (existingProduct) {
                    // If the product already exists in the cart, increment the quantity
                    const updatedCart = cart.map((item) =>
                      item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                    );
                    setCart(updatedCart);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                  } else {
                    // If the product doesn't exist, add it with quantity 1
                    setCart([...cart, { ...product, quantity: 1 }]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, { ...product, quantity: 1 }])
                    );
                  }
                  toast.success("Item added to cart");
                }}
              >
                Add to Cart
              </button>
              <button className="btn favorite-btn">
                Favorite
                <img
                  src={mylike}
                  alt="My Icon"
                  style={{ width: "1.5rem", height: "1.5rem" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Review Tabs */}
      <div className="tabs-section">
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`tab-btn ${activeTab === "review" ? "active" : ""}`}
            onClick={() => setActiveTab("review")}
          >
            Reviews
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "description" && (
            <div className="description-content">
              <p>
                {product.description ||
                  "This is a fantastic product offering quality and style."}
              </p>
            </div>
          )}
          {activeTab === "review" && (
            <div className="reviews-content">
              <h5>Customer Reviews</h5>
              <p>
                <strong>John Doe</strong>
                <br />
                ★★★★★
                <br />
                Excellent shirt, fits perfectly! I would definitely buy again
                from this brand.
              </p>
              <p>
                <strong>Jane Smith</strong>
                <br />
                ★★★☆☆
                <br />
                The fabric is good but the size runs a bit small. Had to
                exchange for a larger size.
              </p>
            </div>
          )}
        </div>
      </div>

      <hr />

      {/* Similar Products Section */}
      <div className="row container mt-4">
        <h4>Similar Products</h4>
        {relatedProducts.length < 1 ? (
          <p className="text-center">No Similar Products Found</p>
        ) : (
          <div className="d-flex flex-wrap">
            {relatedProducts.map((p) => (
              <div className="card similar-product-card m-2" key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
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
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;

// import React, { useEffect, useState } from "react";
// import "./ProductDetails.css";
// import Layout from "../../components/Layout/Layout/Layout";
// import axios from "axios";
// import mylike from "../../assets/icons/heart.svg";
// import { useNavigate } from "react-router-dom";

// import { useParams } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useCart } from "../../context/cart";

// const ProductDetails = () => {
//   const navigate = useNavigate();

//   const [cart, setCart] = useCart();
//   const params = useParams();
//   const [product, setProduct] = useState({});
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [activeTab, setActiveTab] = useState("description"); // Tab state

//   useEffect(() => {
//     if (params?.slug) getProduct();
//   }, [params?.slug]);

//   const getProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
//       );
//       setProduct(data?.product);
//       getSimilarProduct(data?.product._id, data?.product.category._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getSimilarProduct = async (pid, cid) => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
//       );
//       setRelatedProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="product-details-container row mt-4">
//         <div className="col-md-6 d-flex flex-column removespace">
//           <div className="main-image">
//             <img
//               src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
//               className="product-detail-img"
//               alt={product.name}
//             />
//           </div>
//           <div className="image-preview-column justify-content-between">
//             {[1, 2, 3, 4].map((_, index) => (
//               <div className="small-image-box" key={index}>
//                 <img
//                   src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
//                   alt="side view"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Column - Product Details */}
//         <div className="col-md-6 product-details-content">
//           <div className="shoesmartname">
//             <h2 className="brand-name">Shoesmart</h2>
//             <h1 className="product-namedetail">{product.name}</h1>
//           </div>
//           <h3 className="product-price">${product.price}</h3>
//           <div className="tax">
//             <p className="inclusive-text">Inclusive of all taxes</p>
//             <p className="inclusive-text">
//               (Also includes all applicable duties)
//             </p>
//           </div>

//           {/* Size Selection */}
//           <div className="rigthsizeselect">
//             <div className="size-selection">
//               <div className="d-flex justify-content-between align-items-center">
//                 <p className="select-size-text">Select Size</p>
//                 <p className="size-guide-text">Size Guide</p>
//               </div>
//               <div className="size-boxes">
//                 {[...Array(9)].map((_, index) => (
//                   <div key={index} className="size-box">
//                     {index === 0 ? "UK 6 (EU 40)" : `UK ${6 + index * 0.5}`}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="action-buttons ">
//               <button
//                 className="btn add-to-cart-btn"
//                 onClick={() => {
//                   const existingProduct = cart.find(
//                     (item) => item._id === product._id
//                   );
//                   if (existingProduct) {
//                     // If the product already exists in the cart, increment the quantity
//                     const updatedCart = cart.map((item) =>
//                       item._id === product._id
//                         ? { ...item, quantity: item.quantity + 1 }
//                         : item
//                     );
//                     setCart(updatedCart);
//                     localStorage.setItem("cart", JSON.stringify(updatedCart));
//                   } else {
//                     // If the product doesn't exist, add it with quantity 1
//                     setCart([...cart, { ...product, quantity: 1 }]);
//                     localStorage.setItem(
//                       "cart",
//                       JSON.stringify([...cart, { ...product, quantity: 1 }])
//                     );
//                   }
//                   toast.success("Item added to cart");
//                 }}
//               >
//                 Add to Cart
//               </button>

//               {/* <button
//                 className="btn add-to-cart-btn"
//                 onClick={() => {
//                   setCart([...cart, product]);
//                   localStorage.setItem(
//                     "cart",
//                     JSON.stringify([...cart, product])
//                   );
//                   toast.success("Item added to cart");
//                 }}
//                 // onClick={() => {
//                 //   setCart([...cart, ]);
//                 //   toast.success("Item added to cart");
//                 // }}
//               >
//                 Add to Cart
//               </button> */}
//               <button className="btn favorite-btn">
//                 Favorite
//                 <img
//                   src={mylike}
//                   alt="My Icon"
//                   style={{ width: "1.5rem", height: "1.5rem" }}
//                 />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* <hr /> */}

//       {/* Description and Review Tabs */}
//       <div className="tabs-section">
//         <div className="tabs">
//           <button
//             className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
//             onClick={() => setActiveTab("description")}
//           >
//             Description
//           </button>
//           <button
//             className={`tab-btn ${activeTab === "review" ? "active" : ""}`}
//             onClick={() => setActiveTab("review")}
//           >
//             Reviews
//           </button>
//         </div>

//         <div className="tab-content">
//           {activeTab === "description" && (
//             <div className="description-content">
//               <p>
//                 {product.description ||
//                   "This is a fantastic product offering quality and style."}
//               </p>
//             </div>
//           )}
//           {activeTab === "review" && (
//             <div className="reviews-content">
//               <h5>Customer Reviews</h5>
//               <p>
//                 <strong>John Doe</strong>
//                 <br />
//                 ★★★★★
//                 <br />
//                 Excellent shirt, fits perfectly! I would definitely buy again
//                 from this brand.
//               </p>
//               <p>
//                 <strong>Jane Smith</strong>
//                 <br />
//                 ★★★☆☆
//                 <br />
//                 The fabric is good but the size runs a bit small. Had to
//                 exchange for a larger size.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       <hr />

//       {/* Similar Products Section */}
//       <div className="row container mt-4">
//         <h4>Similar Products</h4>
//         {relatedProducts.length < 1 ? (
//           <p className="text-center">No Similar Products Found</p>
//         ) : (
//           <div className="d-flex flex-wrap">
//             {relatedProducts.map((p) => (
//               <div className="card similar-product-card m-2" key={p._id}>
//                 <img
//                   src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}
//                 />
//                 <div className="product-details">
//                   <p className="shoes-color">Shoes</p>
//                   <h5 className="product-name">{p.name}</h5>
//                   <p className="product-price">${p.price}</p>
//                   <div className="button-row">
//                     <button
//                       className="btn buy-btn"
//                       onClick={() => navigate(`/product/${p.slug}`)}
//                       // onClick={() => {
//                       //   setCart([...cart, p]);
//                       //   toast.success("Item added to cart");
//                       // }}
//                     >
//                       Buy a Product
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default ProductDetails;

// import React, { useEffect, useState } from "react";
// import "./ProductDetails.css";
// import Layout from "../../components/Layout/Layout/Layout";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const ProductDetails = () => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({});
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   useEffect(() => {
//     if (params?.slug) getProduct();
//   }, [params?.slug]);

//   const getProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
//       );
//       setProduct(data?.product);
//       getSimilarProduct(data?.product._id, data?.product.category._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getSimilarProduct = async (pid, cid) => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
//       );
//       setRelatedProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="product-details-container row mt-4">
//         {/* Left Column - Image Previews and Main Image */}
//         <div className="col-md-6 d-flex">
//           <div className="image-preview-column">
//             {/* Small boxes for other sides of images */}
//             {[1, 2, 3, 4, 5].map((_, index) => (
//               <div className="small-image-box" key={index}>
//                 <img
//                   src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
//                   alt="side view"
//                 />
//               </div>
//             ))}
//           </div>
//           <div className="main-image">
//             <img
//               src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
//               className="card-img-top"
//               alt={product.name}
//             />
//           </div>
//         </div>

//         {/* Right Column - Product Details */}
//         <div className="col-md-6 product-details-content">
//           <h2 className="brand-name">Shoesmart</h2>
//           <h1 className="product-name">{product.name}</h1>
//           <p className="product-price">${product.price}</p>
//           <p className="inclusive-text">
//             Inclusive of all taxes (Also includes all applicable duties)
//           </p>

//           {/* Size Selection */}
//           <div className="size-selection">
//             <div className="d-flex justify-content-between align-items-center">
//               <p className="select-size-text">Select Size</p>
//               <p className="size-guide-text">Size Guide</p>
//             </div>
//             <div className="size-boxes">
//               {[...Array(9)].map((_, index) => (
//                 <div key={index} className="size-box">
//                   {index === 0 ? "UK 6 (EU 40)" : `UK ${6 + index * 0.5}`}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="action-buttons d-flex mt-4">
//             <button className="btn add-to-cart-btn">Add to Cart</button>
//             <button className="btn favorite-btn">
//               <i className="fas fa-heart"></i> Favorite
//             </button>
//           </div>
//         </div>
//       </div>

//       <hr />

//       {/* Similar Products Section */}
//       <div className="row container mt-4">
//         <h4>Similar Products</h4>
//         {relatedProducts.length < 1 ? (
//           <p className="text-center">No Similar Products Found</p>
//         ) : (
//           <div className="d-flex flex-wrap">
//             {relatedProducts.map((p) => (
//               <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
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
//                   <button className="btn btn-secondary ms-1">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default ProductDetails;

// import React, { useEffect, useState } from "react";
// import Layout from "../../components/Layout/Layout/Layout";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const ProductDetails = () => {
//   //get products
//   const params = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({});
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   //inital product details
//   useEffect(() => {
//     if (params?.slug) getProduct();
//   }, [params?.slug]);

//   //getProduct
//   const getProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
//       );
//       setProduct(data?.product);
//       getSimilarProduct(data?.product._id, data?.product.category._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //get similar product
//   const getSimilarProduct = async (pid, cid) => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
//       );
//       setRelatedProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="row container mt-2">
//         <div className="col-md-6">
//           <img
//             src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
//             className="card-img-top"
//             alt={product.name}
//             height="300"
//             width={"350px"}
//           />
//         </div>
//         <div className="col-md-6">
//           <h1 className="text-center">Product Details</h1>
//           <h6>Name : {product.name}</h6>
//           <h6>Description : {product.description}</h6>
//           <h6>Price : {product.price}</h6>
//           {/* {product.category && <h6>Category : {product.category.name}</h6>} */}
//           <h6>Category : {product.category?.name}</h6>
//           {/* <h6>Shipping : {product.shipping}</h6> */}
//           <button class="btn btn-secondary ms-1">Add to Cart </button>
//         </div>
//       </div>
//       <hr />

//       <div className="row container">
//         <h6>Similar Products</h6>
//         {relatedProducts.length < 1 && (
//           <p className="text-center">No Similar Products Found</p>
//         )}
//         <div className="d-flex flex-wrap">
//           {relatedProducts?.map((p) => (
//             <div className="card m-2" style={{ width: "18rem" }}>
//               <img
//                 src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
//                 className="card-img-top"
//                 alt={p.name}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{p.name}</h5>
//                 <p className="card-text">{p.description.substring(0, 30)}...</p>
//                 <p className="card-text">${p.price}</p>
//                 <button class="btn btn-secondary ms-1">Add to Cart </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ProductDetails;

// import React, { useEffect, useState } from "react";
// import Layout from "../../components/Layout/Layout/Layout";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const ProductDetails = () => {
//   //get products
//   const params = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({});
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   //inital product details
//   useEffect(() => {
//     if (params?.slug) getProduct();
//   }, [params?.slug]);

//   //getProduct
//   const getProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
//       );
//       setProduct(data?.product);
//       getSimilarProduct(data?.product._id, data?.product.category._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //get similar product
//   const getSimilarProduct = async (pid, cid) => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
//       );
//       setRelatedProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="row container mt-2">
//         <div className="col-md-6">
//           <img
//             src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
//             className="card-img-top"
//             alt={product.name}
//             height="300"
//             width={"350px"}
//           />
//         </div>
//         <div className="col-md-6">
//           <h1 className="text-center">Product Details</h1>
//           <h6>Name : {product.name}</h6>
//           <h6>Description : {product.description}</h6>
//           <h6>Price : {product.price}</h6>
//           {/* {product.category && <h6>Category : {product.category.name}</h6>} */}
//           <h6>Category : {product.category?.name}</h6>
//           {/* <h6>Shipping : {product.shipping}</h6> */}
//           <button class="btn btn-secondary ms-1">Add to Cart </button>
//         </div>
//       </div>
//       <hr />

//       <div className="row container">
//         <h6>Similar Products</h6>
//         {relatedProducts.length < 1 && (
//           <p className="text-center">No Similar Products Found</p>
//         )}
//         <div className="d-flex flex-wrap">
//           {relatedProducts?.map((p) => (
//             <div className="card m-2" style={{ width: "18rem" }}>
//               <img
//                 src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
//                 className="card-img-top"
//                 alt={p.name}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{p.name}</h5>
//                 <p className="card-text">{p.description.substring(0, 30)}...</p>
//                 <p className="card-text">${p.price}</p>
//                 <button class="btn btn-secondary ms-1">Add to Cart </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ProductDetails;
// now here in product detail or more detail page i have first left side image of product then right side its details Product Details
// Name : runing
// Description : qwwqwqwqwq
// Price : 25
// Category : Kids
// and add to cart btn and after these i have a similar product section or contaent in that there is shown similar products in card and and so align proper
