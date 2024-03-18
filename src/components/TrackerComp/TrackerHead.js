import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useRef } from "react";
const TrackerHead = () => {
  const itemRef = useRef();
  const moneyRef = useRef();
  const descriptionRef = useRef();
  const submitHandler = async (event) => {
    event.preventDefault();
    const itemInput = itemRef.current.value;
    const moneyInput = moneyRef.current.value;
    const descriptionInput = descriptionRef.current.value;
    const expenseData = {
      item: itemInput,
      amount: moneyInput,
      description: descriptionInput,
    };
    const response = await fetch(
      "https://authentication-581e4-default-rtdb.firebaseio.com/expense.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      }
    );
    if (response.ok) {
      const data = await response.json();
    }
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        marginTop: "50px",
        marginLeft: "400px",
      }}
    >
      <Card
        style={{
          width: "55rem",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            Add Your Daily Expense
          </Card.Title>
          <Card.Text>
            <Form>
              <Container>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Select ref={itemRef}>
                        <option>Food</option>
                        <option>Petrol</option>
                        <option>Bill</option>
                        <option>Items</option>
                        <option>Medicine</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3"></Form.Group>
                  </Col>
                  <Col>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                      <Form.Control
                        ref={moneyRef}
                        placeholder="Enter Amount"
                        aria-label="Enter Amount"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Container>
              <FloatingLabel controlId="floatingTextarea2" label="Description">
                <Form.Control
                  ref={descriptionRef}
                  as="textarea"
                  className="mb-3"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
              <Button variant="primary" onClick={submitHandler}>
                Add Expense
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default TrackerHead;
