import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Form, Row, Col, Modal, Pagination } from "react-bootstrap";
import Header from "../components/Header";
import { searchShoes, deleteShoes, getAllCategories } from "../services/api";

function ShoesList() {
  const [shoesList, setShoesList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,   
    totalPages: 0,    
    totalElements: 0, 
    pageSize: 5,      
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [shoesToDelete, setShoesToDelete] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchShoes();
  }, [currentPage]);
  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy categories:", error);
    }
  };
  const fetchShoes = async () => {
    try {
      const response = await searchShoes(
        filterName,      
        filterCategory,  
        currentPage,     
        pageInfo.pageSize 
      );
      const data = response.data;
      setShoesList(data.content);
      setPageInfo({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        pageSize: data.pageSize,
      });
    } catch (error) {
      console.error("Lỗi khi lấy shoes:", error);
    }
  };
  const handleFilter = () => {
    setCurrentPage(0);
    fetchShoes();
  };
  const handleDeleteClick = (shoes) => {
    setShoesToDelete(shoes);    
    setShowDeleteModal(true);   
  };
  const handleConfirmDelete = async () => {
    try {
      await deleteShoes(shoesToDelete.shoesId);
      setMessage("Deleted successfully");
      setShowDeleteModal(false);
      fetchShoes();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };
  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setShoesToDelete(null);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const formatDate = (dateValue) => {
    if (!dateValue) return ""; 
    const date = new Date(dateValue);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const renderPagination = () => {
    if (pageInfo.totalPages <= 1) return null;

    const items = [];
    items.push(
      <Pagination.Prev
        key="prev"
        disabled={pageInfo.currentPage === 0} 
        onClick={() => handlePageChange(currentPage - 1)}
      />
    );
    for (let i = 0; i < pageInfo.totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === pageInfo.currentPage} 
          onClick={() => handlePageChange(i)}
        >
          {i + 1} 
        </Pagination.Item>
      );
    }
    items.push(
      <Pagination.Next
        key="next"
        disabled={pageInfo.last} 
        onClick={() => handlePageChange(currentPage + 1)}
      />
    );

    return <Pagination className="justify-content-end">{items}</Pagination>;
  };
  return (
    <Container fluid>
      
      <Header title="Shoes List" />

      
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}

      
      <Row className="mb-3 align-items-end">
        
        <Col md={3}>
          <Form.Label>Category:</Form.Label>
          <Form.Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            
            <option value="">-- All --</option>
            
            {categories.map((cat) => (
              <option key={cat.id} value={cat.categoryName}>
                {cat.categoryName}
              </option>
            ))}
          </Form.Select>
        </Col>

        
        <Col md={5}>
          <Form.Label>Shoes Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter shoes name..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </Col>

        
        <Col md={4} className="d-flex gap-2">
          <Button variant="primary" onClick={handleFilter}>
            Filter
          </Button>
          
          <Button variant="success" onClick={() => navigate("/add")}>
            Add New
          </Button>
        </Col>
      </Row>

      
      <Table bordered hover>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Shoes Name</th>
            <th>Category</th>
            <th>Manufacturer</th>
            <th>Price (đ)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          
          {shoesList.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                No records found
              </td>
            </tr>
          ) : (
            shoesList.map((shoes, index) => (
              <tr key={shoes.shoesId}>
                
                <td>{pageInfo.currentPage * pageInfo.pageSize + index + 1}</td>
                <td>{shoes.shoesName}</td>
                <td>{shoes.categoryName}</td>
                <td>{shoes.manufacturer}</td>
                <td>{shoes.price}</td>
                <td>
                  
                  <span
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDeleteClick(shoes)}
                  >
                    Delete
                  </span>
                  {" | "}
                  
                  <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => navigate(`/detail/${shoes.shoesId}`)}
                  >
                    View
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      
      <div className="d-flex justify-content-between align-items-center">
        
        <span>
          Show {shoesList.length} of {pageInfo.totalElements} records
        </span>
        
        {renderPagination()}
      </div>

      
      <Modal show={showDeleteModal} onHide={handleCloseModal} centered>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          Are you sure you want to delete shoes "
          {shoesToDelete?.shoesName}"?
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={handleConfirmDelete}>
            Yes
          </Button>
          
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ShoesList;