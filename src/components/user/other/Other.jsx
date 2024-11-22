// import React, { useEffect, useState } from "react";
// import Layout from "../../Layout";
// import UserMenu from "../../UserMenu/UserMenu";
// import axios from "axios";
// import { useAuth } from "../../../context/auth";
// import moment from "moment";
// import { Spinner } from "react-bootstrap";

// const Other = () => {
//   const [auth] = useAuth();
//   const [orders, setOrders] = useState([]);
//   const [orderLoading, setOrderLoading] = useState(false);

//   const getOrders = async () => {
//     try {
//       setOrderLoading(true);
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/auth/orders`
//       );
//       setOrders(data);
//       setOrderLoading(false);
//     } catch (error) {
//       console.log(error);
//       setOrderLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) getOrders();
//   }, [auth?.token]);

//   return (
//     <Layout title={"Your Orders"}>
//       <div className="container p-3 m-3">
//         <div className="row">
//           <div className="col-md-3">
//             <UserMenu />
//           </div>
//           <div className="col-md-9">
//             <h1 className="text-center">All Orders</h1>
//             {orderLoading ? (
//               <div className="text-center my-3">
//                 <Spinner animation="border" variant="danger" />
//               </div>
//             ) : (
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th scope="col">#</th>
//                     <th scope="col">Products</th>
//                     <th scope="col">Buyer</th>
//                     <th scope="col">Date</th>
//                     <th scope="col">Quantity</th>
//                     <th scope="col">Status</th>
//                     <th scope="col">Details</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders?.map((order, index) => {
//                     const productsList = order.products.map((product) => (
//                       <div key={product.product._id}>
//                         <p>{product.product.name}</p>
//                       </div>
//                     ));

//                     return (
//                       <tr key={order._id}>
//                         <td>{index + 1}</td>
//                         <td>
//                           <div>{productsList}</div>
//                         </td>
//                         <td>
//                           {order.firstName} {order.secondName}
//                         </td>
//                         <td>{moment(order.createdAt).fromNow()}</td>
//                         <td>
//                           {order.products.reduce(
//                             (acc, curr) => acc + parseInt(curr.quantity || 0),
//                             0
//                           )}
//                         </td>
//                         <td
//                           style={{
//                             color:
//                               order.status === "Cancelled" ||
//                               order.status === "Payment failed"
//                                 ? "red"
//                                 : order.status === "Payment status pending"
//                                 ? "yellow"
//                                 : "green",
//                           }}
//                         >
//                           {order.status}
//                         </td>
//                         <td>
//                           <button className="btn ">more...</button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Other;
import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import UserMenu from "../../UserMenu/UserMenu";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link

const Other = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);

  const getOrders = async () => {
    try {
      setOrderLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
      setOrderLoading(false);
    } catch (error) {
      console.log(error);
      setOrderLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orderLoading ? (
              <div className="text-center my-3">
                <Spinner animation="border" variant="danger" />
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Products</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Status</th>
                    <th scope="col">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order, index) => {
                    const productsList = order.products.map((product) => (
                      <div key={product?.product?._id}>
                        <p>{product?.product?.name}</p>
                      </div>
                    ));

                    return (
                      <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>
                          <div>{productsList}</div>
                        </td>
                        <td>
                          {order.firstName} {order.secondName}
                        </td>
                        <td>{moment(order.createdAt).fromNow()}</td>
                        <td>
                          {order.products.reduce(
                            (acc, curr) => acc + parseInt(curr.quantity || 0),
                            0
                          )}
                        </td>
                        <td
                          style={{
                            color:
                              order.status === "Cancelled" ||
                              order.status === "Payment failed"
                                ? "red"
                                : order.status === "Payment status pending"
                                ? "yellow"
                                : "green",
                          }}
                        >
                          {order.status}
                        </td>
                        <td>
                          <Link
                            to={`/dashboard/user/order/${order._id}`}
                            className="btn"
                          >
                            more...
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Other;
