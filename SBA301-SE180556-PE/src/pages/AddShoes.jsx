import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import Header from "../components/Header";
import { getAllCategories, createShoes } from "../services/api";

function AddShoes() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    shoesName: "",
    price: "",
    manufacturer: "",
    productionDate: "",
    importDate: "",
    categoryId: "",
    quantity: 1,
  });
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy categories:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const validate = () => {
    const newErrors = {};
    if (!formData.shoesName.trim()) {
      newErrors.shoesName = "Shoes Name is required";
    } else if (formData.shoesName.trim().length > 100) {
      newErrors.shoesName = "Shoes Name must be less than 100 characters";
    }
    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price)) {
      newErrors.price = "Price must be a number";
    } else if (Number(formData.price) <= 0 || Number(formData.price) >= 10000) {
      newErrors.price = "Price must be greater than 0 and less than 10000";
    }
    if (!formData.manufacturer.trim()) {
      newErrors.manufacturer = "Manufacturer is required";
    } else if (formData.manufacturer.trim().length > 100) {
      newErrors.manufacturer = "Manufacturer must be less than 100 characters";
    }
    if (!formData.productionDate) {
      newErrors.productionDate = "Production Date is required";
    }
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }

    return newErrors;
  };
  const handleSave = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload = {
        shoesName: formData.shoesName.trim(),
        price: Number(formData.price),
        manufacturer: formData.manufacturer.trim(),
        productionDate: formData.productionDate ? new Date(formData.productionDate) : null,
        importDate: formData.importDate ? new Date(formData.importDate) : null,
        categoryId: Number(formData.categoryId),
        quantity: formData.quantity,
      };
      await createShoes(payload);
      setSuccessMessage("Created new shoes successfully");
      setFormData({
        shoesName: "",
        price: "",
        manufacturer: "",
        productionDate: "",
        importDate: "",
        categoryId: "",
        quantity: 1,
      });
      setErrors({});
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi tạo shoes:", error);
    }
  };

  return (
    <Container>
      
      <Header title="Add New Shoes" />

      
      {successMessage && (
        <Alert variant="success">{successMessage}</Alert>
      )}

      <Row className="justify-content-center">
        <Col md={6}>

          
          <Form.Group className="mb-3" as={Row}>
            <Form.Label column md={4} className="text-end">
              Shoes name: <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col md={8}>
              <Form.Control
                type="text"
                name="shoesName"
                value={formData.shoesName}
                onChange={handleChange}
                isInvalid={!!errors.shoesName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.shoesName}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          
          <Form.Group className="mb-3" as={Row}>
            <Form.Label column md={4} className="text-end">
              Price: <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col md={8}>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          
          <Form.Group className="mb-3" as={Row}>
            <Form.Label column md={4} className="text-end">
              Manufacture: <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col md={8}>
              <Form.Control
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                isInvalid={!!errors.manufacturer}
              />
              <Form.Control.Feedback type="invalid">
                {errors.manufacturer}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          
          <Form.Group className="mb-3" as={Row}>
            <Form.Label column md={4} className="text-end">
              Production Date: <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col md={3}>
              <Form.Control
                type="date"
                name="productionDate"
                value={formData.productionDate}
                onChange={handleChange}
                isInvalid={!!errors.productionDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.productionDate}
              </Form.Control.Feedback>
            </Col>
            <Form.Label column md={2} className="text-end">
              Import Date:
            </Form.Label>
            <Col md={3}>
              <Form.Control
                type="date"
                name="importDate"
                value={formData.importDate}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          
          <Form.Group className="mb-3" as={Row}>
            <Form.Label column md={4} className="text-end">
              Category: <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col md={8}>
              <Form.Select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                isInvalid={!!errors.categoryId}
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.categoryId}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          
          <Row>
            <Col className="text-center">
              <Button variant="primary" className="me-3" onClick={handleSave}>
                Save
              </Button>
              <Button variant="secondary" onClick={() => navigate("/")}>
                Back
              </Button>
            </Col>
          </Row>

        </Col>
      </Row>

      <p className="text-center mt-5">@Copyright 2026</p>
    </Container>
  );
}

export default AddShoes;