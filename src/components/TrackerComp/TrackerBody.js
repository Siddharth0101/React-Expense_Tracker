import React, { useEffect, useState } from "react";
import { Button, Card, Table, Modal, Form, ButtonGroup } from "react-bootstrap";

const TrackerBody = () => {
  const [dailyExpense, setDailyExpense] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedExpense, setEditedExpense] = useState({});
  const [editedItem, setEditedItem] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://authentication-581e4-default-rtdb.firebaseio.com/expense.json"
      );
      if (response.ok) {
        const data = await response.json();
        const enteredData = Object.keys(data).map((key) => ({
          id: key,
          item: data[key].item,
          price: data[key].amount,
          description: data[key].description,
        }));
        setDailyExpense(enteredData);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id) => {
    const expenseToEdit = dailyExpense.find((expense) => expense.id === id);
    setEditedExpense(expenseToEdit);
    setEditedItem(expenseToEdit.item);
    setEditedPrice(expenseToEdit.price);
    setEditedDescription(expenseToEdit.description);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditedExpense({});
    setEditedItem("");
    setEditedPrice("");
    setEditedDescription("");
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `https://authentication-581e4-default-rtdb.firebaseio.com/expense/${editedExpense.id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item: editedItem,
            amount: editedPrice,
            description: editedDescription,
          }),
        }
      );
      if (response.ok) {
        fetchData();
        setShowModal(false);
      } else {
        throw new Error("Failed to save changes");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://authentication-581e4-default-rtdb.firebaseio.com/expense/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchData();
      } else {
        throw new Error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div style={{ marginTop: "50px", marginLeft: "50px" }}>
      <Card
        style={{
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            List Of Expenses
          </Card.Title>
          <Card.Text>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dailyExpense.map((item) => (
                  <tr key={item.id}>
                    <td>{item.item}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>
                      <div className="d-flex gap-3">
                        <ButtonGroup style={{ width: "100%" }}>
                          <Button
                            variant="outline-warning"
                            size="sm"
                            style={{ width: "50%" }}
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            style={{ width: "50%" }}
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formItem">
              <Form.Label>Item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item"
                value={editedItem}
                onChange={(e) => setEditedItem(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TrackerBody;
