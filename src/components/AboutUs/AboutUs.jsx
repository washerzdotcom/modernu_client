import React from "react";
import Layout from "../Layout";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./AboutUs.css";
import HeaderLeft from "../../assets/aboutus.png";

const AboutUs = () => {
  return (
    <Layout title="About us - hair accessories">
      <Container className="my-3">
        <div>
          <Row>
            <Col md={6}>
              <div className="h_ftright mt-3">
                <div className="containerBox">
                  <h1 style={{ color: "#3D3F42", fontWeight: "bold" }}>
                    WOMEN ACCESSORIES
                  </h1>
                  <p className="text-secondary my-4">
                    Welcome to ModernU, your destination for premium hair
                    accessories designed to elevate everyday elegance. At
                    ModernU, we believe that every woman and child deserves to
                    shine with style and confidence.
                  </p>
                  <p className="text-secondary my-4">
                    Our curated collection features a range of luxurious and
                    on-trend hair accessories, crafted with care to ensure both
                    beauty and durability. From chic clips to elegant headbands,
                    each piece is designed to complement your unique style and
                    add a touch of sophistication to any outfit.
                  </p>
                  <p className="text-secondary my-4">
                    At ModernU, we are passionate about quality and
                    craftsmanship. Our accessories are sourced from the finest
                    materials and crafted by skilled artisans, ensuring that you
                    receive only the best. Whether you're looking for a
                    statement piece for a special occasion or everyday
                    essentials to enhance your look, we have something for
                    everyone.
                  </p>
                  <p className="text-secondary my-4">
                    Explore our collection and discover how ModernU can
                    transform your hair routine into a stylish statement.
                  </p>
                  <div className="font-weight-bold">
                    Join us in celebrating the art of accessorizing.
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="h_footer">
                <div className="h_ftCona">
                  <img
                    src={HeaderLeft}
                    alt="header-footer"
                    className="img-fluid"
                    style={{ minHeight: "80vh" }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </Layout>
  );
};

export default AboutUs;
