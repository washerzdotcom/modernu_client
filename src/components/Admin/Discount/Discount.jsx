import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import AdminMenu from "../../AdminMenu/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal, Input, DatePicker } from "antd"; // Import DatePicker for expiry date
import moment from "moment";

const Discount = () => {
  // State variables
  const [code, setCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [expiryDate, setExpiryDate] = useState(null); // Use AntD's DatePicker component
  const [discounts, setDiscounts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [updatedCode, setUpdatedCode] = useState("");
  const [updatedPercentage, setUpdatedPercentage] = useState("");
  const [updatedExpiryDate, setUpdatedExpiryDate] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/discount/create`,
        {
          code,
          discountPercentage,
          expiryDate,
        }
      );
      if (data.success) {
        toast.success("Discount code created successfully!");
        // Clear the form
        setCode("");
        setDiscountPercentage("");
        setExpiryDate(null);
        // Reload discounts
        loadDiscounts();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Error creating discount code");
    }
  };

  // Load discounts from the backend
  const loadDiscounts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/discount/list`
      );
      setDiscounts(data.discounts); // Assuming your backend sends a "discounts" array
    } catch (error) {
      toast.error("Error loading discounts");
    }
  };

  // Function to handle updating a discount code
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Check if updatedExpiryDate is defined and is a moment object
    if (!updatedExpiryDate || !moment(updatedExpiryDate).isValid()) {
      toast.error("Invalid date format");
      return;
    }

    try {
      // Convert moment object to ISO string for the server
      const formattedDate = moment.isMoment(updatedExpiryDate)
        ? updatedExpiryDate.toISOString()
        : new Date(updatedExpiryDate).toISOString(); // Fallback to Date conversion

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/discount/update/${updatedCode}`,
        {
          discountPercentage: updatedPercentage,
          expiryDate: formattedDate,
        }
      );

      if (data.success) {
        toast.success("Discount updated successfully!");
        setVisible(false);
        loadDiscounts();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Update error details:", error.response || error.message);
      toast.error("Error updating discount");
    }
  };

  useEffect(() => {
    // Load discounts when the component is mounted
    loadDiscounts();
  }, []);

  return (
    <Layout title={"Dashboard - Admin Create Discount"}>
      <Container fluid className="m-3 p-3">
        <Row>
          <Col md={3}>
            <AdminMenu />
          </Col>
          <Col md={9}>
            <h1>Create Discounts</h1>
            <div className="p-3 w-50">
              <form onSubmit={handleSubmit}>
                <Input
                  placeholder="Discount Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
                <Input
                  placeholder="Discount Percentage"
                  type="number"
                  min="1"
                  max="100"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  required
                />
                <DatePicker
                  placeholder="Expiry Date"
                  onChange={(date) => setExpiryDate(date)}
                  required
                />
                <Button variant="primary" type="submit" className="mt-2">
                  Create Discount
                </Button>
              </form>
            </div>
            <div className="w-75">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Discount (%)</th>
                    <th>Expiry Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {discounts.map((discount) => (
                    <tr key={discount._id}>
                      <td>{discount.code}</td>
                      <td>{discount.discountPercentage}</td>
                      <td>
                        {new Date(discount.expiryDate).toLocaleDateString()}
                      </td>
                      <td>
                        <Button
                          variant="warning"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedCode(discount.code);
                            setUpdatedPercentage(discount.discountPercentage);
                            setUpdatedExpiryDate(discount.expiryDate);
                          }}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Update Discount Modal */}
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <h4>Edit Discount</h4>
              <form onSubmit={handleUpdate}>
                <Input
                  placeholder="Discount Percentage"
                  type="number"
                  min="1"
                  max="100"
                  value={updatedPercentage}
                  onChange={(e) => setUpdatedPercentage(e.target.value)}
                  required
                />
                <DatePicker
                  placeholder="Expiry Date"
                  value={updatedExpiryDate ? moment(updatedExpiryDate) : null} // Ensure it's a moment object
                  onChange={(date) => setUpdatedExpiryDate(date)} // The `date` should be a moment object
                  required
                />

                <Button variant="primary" type="submit" className="mt-2">
                  Update Discount
                </Button>
              </form>
            </Modal>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Discount;
