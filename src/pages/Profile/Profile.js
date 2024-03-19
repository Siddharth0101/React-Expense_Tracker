import { useContext, useEffect, useRef, useState } from "react";
import CardUI from "../../components/UI/CardUI";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import AuthContext from "../../store/AuthContext";
import { Container } from "react-bootstrap";
const Profile = (props) => {
  const fullNameRef = useRef();
  const imageRef = useRef();
  const authCtx = useContext(AuthContext);
  const [getName, setGetName] = useState();
  const [getImage, setGetImage] = useState();
  const [getUpdate, setGetUpdate] = useState(false);
  const [emailUpdate, setEmailUpdate] = useState();
  const [disableVerifyEmail, setDisableVerifyEmail] = useState(false);
  const emailUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC_9FkN0G0MqW3Uty3KRdVV2XzE-tuzQeI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application.json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.token,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {}
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const fullNameInput = fullNameRef.current.value;
    const imageInput = imageRef.current.value;
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC_9FkN0G0MqW3Uty3KRdVV2XzE-tuzQeI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application.json",
          },
          body: JSON.stringify({
            idToken: authCtx.token,
            displayName: fullNameInput,
            photoUrl: imageInput,
            returnSecureToken: true,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setDisableVerifyEmail(data.emailVerified);
        console.log(data);
      }
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const responseFetch = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC_9FkN0G0MqW3Uty3KRdVV2XzE-tuzQeI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application.json",
          },
          body: JSON.stringify({
            idToken: authCtx.token,
          }),
        }
      );
      if (responseFetch.ok) {
        const data = await responseFetch.json();
        setEmailUpdate(data.users[0].email);
        if (!!data.users[0].displayName && !!data.users[0].photoUrl) {
          setGetUpdate(true);
        }
        setGetName(data.users[0].displayName);
        setGetImage(data.users[0].photoUrl);
      }
    };
    fetchData();
  }, []);
  props.OnHeader(getUpdate);
  return (
    <div>
      <CardUI>
        <Form onSubmit={submitHandler}>
          <Row className="mb-3">
            <Col>
              <Col xs={6} md={4}>
                <Image src={getImage} roundedCircle className="mb-3" />
                <h4 style={{ textAlign: "center", marginLeft: "80px" }}>
                  {getName}
                </h4>
              </Col>
            </Col>
            <Col>
              <Form.Group controlId="formGridName" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter Full Name"
                  ref={fullNameRef}
                />
              </Form.Group>
              <Form.Group controlId="formGridImage" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Image Url"
                  ref={imageRef}
                />
              </Form.Group>
              <Container>
                <Row>
                  <Col xs={7}>
                    <Form.Group controlId="formGridName" className="mb-3">
                      <Form.Control type="text" value={emailUpdate} disabled />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Button onClick={emailUpdateHandler}>
                      {!disableVerifyEmail ? "Verify email" : "Email verified"}
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>

          <Button
            variant="primary"
            type="submit"
            style={{ marginLeft: "410px" }}
          >
            Submit
          </Button>
        </Form>
      </CardUI>
    </div>
  );
};
export default Profile;
