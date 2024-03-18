import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import image1 from "../../images/image-1/10808.jpg";
const Welcome = () => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "5px",
        marginLeft: "7px",
      }}
    >
      <Card
        style={{
          width: "106rem",
          height: "49rem",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Body>
          <Card.Text>
            <Carousel>
              <Carousel.Item>
                <img
                  src={image1}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <image1 text="First slide" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src={image1}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Welcome;
