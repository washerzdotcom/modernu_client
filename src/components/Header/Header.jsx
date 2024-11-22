import { Container } from "react-bootstrap";
import "./Header.css";
import HeaderFoot from "../HeaderFoot/HeaderFoot";
import Product from "../Products/Product";
import KidsProductMenu from "../Products/KidsProductMenu";

const Header = () => {
  return (
    <div>
      <Product />
      <Container>
        <div className="headerFoot my-4">
          <HeaderFoot />
        </div>
        <KidsProductMenu />
      </Container>
    </div>
  );
};

export default Header;
