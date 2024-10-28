import React from "react";
// import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ props, children }) => {
  return (
    <div>
      {/* <Header /> */}
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
