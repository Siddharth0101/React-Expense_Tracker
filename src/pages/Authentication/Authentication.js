import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);

    if (!isLogin) {
      const emailInput = emailRef.current.value;
      const passInp = passRef.current.value;
      const confirmInp = confirmPassRef.current.value;
      console.log(emailInput);
      console.log(passInp);
      console.log(confirmInp);
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Button
              onClick={switchAuthModeHandler}
              variant={isLogin ? "primary" : "outline-secondary"}
              size="lg"
              style={{
                marginRight: "1rem",
                width: "8rem",
                borderRadius: "8px",
              }}
            >
              Login
            </Button>
            <Button
              onClick={switchAuthModeHandler}
              variant={!isLogin ? "primary" : "outline-secondary"}
              size="lg"
              style={{
                width: "8rem",
                borderRadius: "8px",
              }}
            >
              Register
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Authentication;
