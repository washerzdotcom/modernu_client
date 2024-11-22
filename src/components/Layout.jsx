import React from "react";
import Topbar from "./Topbar/Topbar";
import Footer from "./Footer/Footer";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import whatsaapLogo from "../assets/whatsaap.png";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>
        <Topbar />
        <main style={{ minHeight: "70vh" }}>{children}</main>
        <Footer />
      </div>
      <div
        className="fixed-bottom right-100 p-3"
        style={{ zIndex: "6", left: "initial" }}
      >
        <Link
          to="https://api.whatsapp.com/send?phone=919355532976"
          target="_blank"
        >
          <img src={whatsaapLogo} alt="modernu" width={60} />
        </Link>
      </div>
    </>
  );
};

Layout.defaultProps = {
  title: "ModernU | Heir Accessories - shop now",
  description:
    "Classic and Elegant Hair Accessories,Trendy Hair Accessories for Every Style,Premium Quality Hair Accessories,Affordable and Fashionable Hair Accessories,Unique Hair Accessories Collection",
  keywords:
    "Hair Accessories,Hair Clips,Hair Bands,Hair Ties,Headbands,Hair Pins,Scrunchies,Hair Barrettes,Hair Bows,Hair Combs,Hair Sticks,Hair Jewelry",
  author: "ModernU",
};

export default Layout;
