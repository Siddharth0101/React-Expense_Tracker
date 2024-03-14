import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { redirect } from "react-router-dom";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setShowAlert(false);
    setLoginError(false);
  };

  const handleRegister = async () => {
    if (!isLogin) {
      const emailInp = emailRef.current.value;
      const passInp = passRef.current.value;
      const confirmInp = confirmPassRef.current.value;
      if (passInp !== confirmInp) {
        setShowAlert(true);
        return;
      }
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_9FkN0G0MqW3Uty3KRdVV2XzE-tuzQeI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailInp,
            password: passInp,
            returnSecureToken: true,
          }),
        }
      );
    } else {
      const emailInp = emailRef.current.value;
      const passInp = passRef.current.value;
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_9FkN0G0MqW3Uty3KRdVV2XzE-tuzQeI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailInp,
            password: passInp,
            returnSecureToken: true,
          }),
        }
      );
      if (response.ok) {
        setLoginError(false);
        const data = await response.json();
        console.log(data);
        window.location.href = "/welcome";
      }
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        setLoginError(true);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Card
        style={{
          width: "25rem",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Body>
          <Card.Title
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              color: "#007bff",
            }}
          >
            {isLogin ? "Login" : "Register"}
          </Card.Title>
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="name@example.com"
                style={{ borderRadius: "8px" }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                ref={passRef}
                type="password"
                placeholder="Password"
                style={{ borderRadius: "8px" }}
              />
            </FloatingLabel>
            {!isLogin && (
              <FloatingLabel
                controlId="floatingConfirmPassword"
                label="Confirm Password"
                className="mb-3"
              >
                <Form.Control
                  ref={confirmPassRef}
                  type="password"
                  placeholder="Confirm Password"
                  style={{ borderRadius: "8px" }}
                />
              </FloatingLabel>
            )}
          </Form>
          {showAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              <Alert.Heading>Password do not match!</Alert.Heading>
              <p>Please make sure your passwords match.</p>
            </Alert>
          )}
          {loginError && (
            <Alert
              variant="danger"
              onClose={() => setLoginError(false)}
              dismissible
            >
              <Alert.Heading>Login Failed!</Alert.Heading>
              <p>Please check your email and password and try again.</p>
            </Alert>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Button
              onClick={handleRegister}
              variant={!isLogin ? "primary" : "outline-success"}
              size="lg"
              style={{
                marginRight: "1rem",
                width: "8rem",
                borderRadius: "8px",
              }}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
            <Button
              onClick={switchAuthModeHandler}
              variant={isLogin ? "primary" : "outline-secondary"}
              size="lg"
              style={{
                width: "8rem",
                borderRadius: "8px",
              }}
            >
              {!isLogin ? "Login" : "Register"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Authentication;
