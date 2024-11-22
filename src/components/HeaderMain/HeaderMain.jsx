import Closure from "../Closure/Closure";
import Header from "../Header/Header";
import Layout from "../Layout";
import "./HeaderMain.css";
import { useAuth } from "../../context/auth";

const HeaderMain = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout className="h_main">
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      <Closure />
      <Header />
    </Layout>
  );
};

export default HeaderMain;
