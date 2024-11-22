import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import AdminMenu from "../../AdminMenu/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import Categoryform from "../Form/Categoryform";
import { Modal } from "antd";

const KidCreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productType = "kid";
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category?productType=${productType}`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created.`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("someting went worng in input form");
    }
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const productType = "kid";
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category?productType=${productType}`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somthing went wrong in update");
    }
  };

  //delete category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somthing went wrong in update");
    }
  };
  return (
    <Layout title={"Dashboard - kid Create Category"}>
      <Container fluid className="m-3 p-3">
        <Row>
          <Col md={3}>
            <AdminMenu />
          </Col>
          <Col md={9}>
            <h1>Manage Kid Category</h1>
            <div className="p-3 w-50">
              <Categoryform
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <div className="gap-2">
                            <Button
                              className="mx-3"
                              variant="info"
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => {
                                handleDelete(c._id);
                              }}
                            >
                              delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <Categoryform
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </Row>
      </Container>
    </Layout>
  );
};

export default KidCreateCategory;
