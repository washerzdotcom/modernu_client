import "./Topbar.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import logo from "../../assets/logo.png";
import { Button } from "react-bootstrap";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../SearchInput/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Topbar = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    toast.success("Logout Successfully");
    localStorage.removeItem("auth");
    navigate("/login");
  };

  // //get all women category
  // const getAllCategory = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API}/api/v1/category/get-category`
  //     );
  //     if (data?.success) {
  //       setCategories(data?.category);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong in getting category");
  //   }
  // };

  // //get all kids category
  // const getAllKidCategory = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API}/api/v1/kid-category/kid-get-category`
  //     );
  //     if (data?.success) {
  //       setKidcategories(data?.category);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong in getting category");
  //   }
  // };

  // useEffect(() => {
  //   getAllCategory();
  //   getAllKidCategory();
  // }, []);
  console.log(cart.length);
  return (
    <div>
      <Navbar expand="lg" className="bg-transparent shadow-sm">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              alt="logo"
              style={{ width: "50%", height: "100%", objectFit: "cover" }}
            />
          </Navbar.Brand>
          <SearchInput />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-center d-flex justify-content-center align-items-center">
              <Link
                to="/"
                className="text-secondary nav-link text-decoration-none fw-bold"
              >
                Home
              </Link>
              <Link
                to="/women"
                className="text-secondary nav-link text-decoration-none fw-bold"
              >
                Women
              </Link>
              <Link
                to="/Kids"
                className="text-secondary nav-link text-decoration-none fw-bold"
              >
                Kids
              </Link>
              {/* <NavDropdown title="Kids" id="basic-nav-dropdown">
                {kidcategories?.map((k) => (
                  <NavDropdown.Item href={k.name} key={k._id}>
                    {k.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown> */}
              <Link
                to="/about"
                className="text-secondary nav-link text-decoration-none fw-bold"
              >
                About Us
              </Link>
              <Badge count={cart?.length} showZero>
                <Link
                  to="/cart"
                  className="text-secondary nav-link text-decoration-none fw-bold"
                >
                  cart
                </Link>
              </Badge>

              {auth.user && (
                <>
                  <NavDropdown title={auth?.user?.name} id="basic-nav-dropdown">
                    <NavDropdown.Item
                      href={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Button
                        size="sm"
                        onClick={handleLogout}
                        className="bg_login fw-bold text-decoration-none border-0"
                      >
                        logout
                      </Button>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              <Nav.Link
                href="/login"
                className="text-secondary fw-bold text-decoration-none border-0"
              >
                {!auth.user && (
                  <Button
                    size="sm"
                    className="bg_login fw-bold text-decoration-none border-0"
                  >
                    login
                  </Button>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Topbar;
