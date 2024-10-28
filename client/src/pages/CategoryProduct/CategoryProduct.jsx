import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );

      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found</h6>
        {/* <div className="row"> */}
        <section className="products-section">
          <div className="d-flex flex-wrap product-cards">
            {products?.map((p) => (
              <div className="product-card">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="product-img"
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
              // </Link>
            ))}
          </div>
        </section>
      </div>
      {/* </div> */}
    </Layout>
  );
};

export default CategoryProduct;
