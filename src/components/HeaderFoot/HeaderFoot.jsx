import { Button, Col, Row } from "react-bootstrap";
import "./HeaderFoot.css";
import HeaderLeft from "../../assets/headerRight.jpg";
import { Link } from "react-router-dom";

const HeaderFoot = () => {
  return (
    <div>
      <Row>
        <Col md={6}>
          <div className="h_footer">
            <div className="h_ftCona">
              <img src={HeaderLeft} alt="header-footer" className="img-fluid" />
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="h_ftright">
            <div className="containerBox">
              <h1 style={{ color: "#3D3F42", fontWeight: "bold" }}>
                WOMEN ACCESSORIES{" "}
              </h1>
              <p className="text-secondary my-4">
                Welcome to ModernU, your destination for premium hair
                accessories designed to elevate everyday elegance. At ModernU,
                we believe that every woman and child deserves to shine with
                style and confidence.
              </p>
              <p className="text-secondary my-4">
                Our curated collection features a range of luxurious and
                on-trend hair accessories, crafted with care to ensure both
                beauty and durability. From chic clips to elegant headbands,
                each piece is designed to complement your unique style and add a
                touch of sophistication to any outfit.
              </p>
              <p className="text-secondary my-4">
                At ModernU, we are passionate about quality and craftsmanship.
                Our accessories are sourced from the finest materials and
                crafted by skilled artisans, ensuring that you receive only the
                best. Whether you're looking for a statement piece for a special
                occasion or everyday essentials to enhance your look, we have
                something for everyone.
              </p>
              <div className="d-flex justify-content-between align-items-start w-50 mt-4">
                <Link to="/about">
                  <Button className="bg_login fw-bold border-0">
                    Read more...
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderFoot;
