import { useRef } from "react";
import CardUI from "../../components/UI/CardUI";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
const Profile = () => {
  const firstNameref = useRef();
  const lastNameref = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const firstNameInput = firstNameref.current.value;
    const LastNameInput = lastNameref.current.value;
    const addressInput = addressRef.current.value;
    const cityInput = cityRef.current.value;
    const stateInput = stateRef.current.value;
    const zipInput = zipRef.current.value;
    const data = {
      first: firstNameInput,
      last: LastNameInput,
      address: addressInput,
      city: cityInput,
      state: stateInput,
      zip: zipInput,
    };
    // fetch(
    //   "https://authentication-581e4-default-rtdb.firebaseio.com/test.json()",
    //   {
    //     method: "post",
    //   }
    // );
  };
  return (
    <div>
      <CardUI>
        <Form onSubmit={submitHandler}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                ref={firstNameref}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                ref={lastNameref}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="1234 Main St"
              ref={addressRef}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" ref={cityRef} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" ref={stateRef} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control type="text" ref={zipRef} />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </CardUI>
    </div>
  );
};
export default Profile;
