import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import { getShoesById } from "../services/api";

function ShoesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shoes, setShoes] = useState(null);
  useEffect(() => {
    fetchShoesDetail();
  }, []);
  const fetchShoesDetail = async () => {
    try {
      const response = await getShoesById(id);
      setShoes(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết shoes:", error);
    }
  };
  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    const date = new Date(dateValue);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  if (!shoes) {
    return (
      <Container>
        <Header title="View Details" />
        <p className="text-center">Loading...</p>
      </Container>
    );
  }
  return (
    <Container>
      
      <Header title="View Details" />

      
      <Card className="mx-auto mt-3" style={{ maxWidth: "500px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">VIEW DETAILS</Card.Title>

          
          <Row className="mb-2">
            <Col md={5} className="text-end fw-bold">Shoes Name:</Col>
            <Col md={7}>{shoes.shoesName}</Col>
          </Row>

          <Row className="mb-2">
            <Col md={5} className="text-end fw-bold">Manufacturer:</Col>
            <Col md={7}>{shoes.manufacturer}</Col>
          </Row>

          <Row className="mb-2">
            <Col md={5} className="text-end fw-bold">Type:</Col>
            
            <Col md={7}>{shoes.categoryName}</Col>
          </Row>

          <Row className="mb-2">
            <Col md={5} className="text-end fw-bold">Price (đ):</Col>
            <Col md={7}>{shoes.price}</Col>
          </Row>

          <Row className="mb-2">
            <Col md={5} className="text-end fw-bold">Production date:</Col>
            
            <Col md={7}>{formatDate(shoes.productionDate)}</Col>
          </Row>

          <Row className="mb-2">
            <Col md={5} className="text-end fw-bold">Import Date:</Col>
            <Col md={7}>{formatDate(shoes.importDate)}</Col>
          </Row>

          
          <div className="text-center mt-4">
            <Button variant="secondary" onClick={() => navigate("/")}>
              Quay Lại
            </Button>
          </div>
        </Card.Body>
      </Card>

      
      <p className="text-center mt-4">@Copyright 2026</p>
    </Container>
  );
}

export default ShoesDetail;