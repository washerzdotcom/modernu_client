import { Route, Routes } from "react-router-dom";
import HeaderMain from "./components/HeaderMain/HeaderMain";
import AboutUs from "./components/AboutUs/AboutUs";
import PageNotFound from "./components/PageNotfound/pageNotfound";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import ForgotPassword from "./components/LoginRegister/ForgotPassword";
import Dashboard from "./components/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import Admindashboard from "./components/Admin/Admindashboard";
import CreateCategory from "./components/Admin/CreateCategory/CreateCategory";
import CreateProduct from "./components/Admin/CreateProduct/CreateProduct";
import Users from "./components/Admin/Users/Users";
import Profile from "./components/user/Profile/Profile";
import AdminProduct from "./components/Admin/AdminProduct/AdminProduct";
import UpdateProduct from "./components/Admin/UpdateProduct/UpdateProduct";
import KidCreateCategory from "./components/Admin/CreateCategory/KidCreateCategory";
import KidCreateProduct from "./components/Admin/CreateProduct/KidCreateProduct";
import KidProducts from "./components/Admin/AdminProduct/KidProducts";
import UpdateKidProducts from "./components/Admin/UpdateProduct/UpdateKidProducts";
import FilterProducts from "./components/Products/FilterProducts";
import KidFilterProducts from "./components/Products/KidFilterProducts";
import Search from "./components/SearchInput/Search";
import ProductDetails from "./components/ProductDetail/ProductDetails";
import KidProductDetails from "./components/ProductDetail/KidProductDetails";
import CartPage from "./components/Cartpage/CartPage";
import Other from "./components/user/other/Other";
import AdminOders from "./components/Admin/Oders/AdminOders";
import CheckOut from "./components/Cartpage/CheckOut";
import PaymentSuccess from "./components/Payment/PaymentSuccess";
import PaymentFailure from "./components/Payment/PaymentFailure";
import OrderDetail from "./components/user/other/OrderDetail";
import Discount from "./components/Admin/Discount/Discount";
import AddNewAdmin from "./components/Admin/AddNewAdmin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HeaderMain />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/kid-product/:slug" element={<KidProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/other" element={<Other />} />
          <Route path="user/order/:orderId" element={<OrderDetail />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<Admindashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route
            path="admin/kid-create-category"
            element={<KidCreateCategory />}
          />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route
            path="admin/kid-create-product"
            element={<KidCreateProduct />}
          />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route
            path="admin/kid-products/:slug"
            element={<UpdateKidProducts />}
          />
          <Route path="admin/products" element={<AdminProduct />} />
          <Route path="admin/kid-products" element={<KidProducts />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOders />} />
          <Route path="admin/discount" element={<Discount />} />
          <Route path="admin/addNewAdmin" element={<AddNewAdmin />} />
        </Route>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/women" element={<FilterProducts />} />
        <Route path="/kids" element={<KidFilterProducts />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
