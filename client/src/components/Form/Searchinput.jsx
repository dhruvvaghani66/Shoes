import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";
import "./SearchInput.css"; // Assuming the CSS will be in the same folder

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data.results });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="search-container">
      <form className="search-box" onSubmit={handleSubmit}>
        {/* <i className="fas fa-search search-icon" /> */}
        <input
          className="search-input"
          type="text"
          placeholder="Search for products..."
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn search-btn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;

// import React from "react";
// import axios from "axios";

// import { useNavigate } from "react-router-dom";
// import { useSearch } from "../../context/search";

// const SearchInput = () => {
//   const [values, setValues] = useSearch();
//   const navigate = useNavigate();

//   // console.log("Keyword:", values.keyword);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // console.log("Keyword:", values.keyword);

//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
//       );
//       // console.log("Response Data:", data);

//       // Set the results correctly
//       setValues({ ...values, results: data.results }); // Use data.results
//       navigate("/search");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <form
//         className="d-flex search-form"
//         role="search"
//         onSubmit={handleSubmit}
//       >
//         <input
//           className="form-control me-2"
//           type="search"
//           placeholder="Search"
//           aria-label="Search"
//           value={values.keyword}
//           onChange={(e) => setValues({ ...values, keyword: e.target.value })}
//         />
//         <button className="btn btn-outline-success" type="submit">
//           Search
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SearchInput;
