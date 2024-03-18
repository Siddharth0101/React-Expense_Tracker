import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import image1 from "../../images/image-1/10808.jpg";
import image2 from "../../images/image-2/savings-list.jpg";
import image3 from "../../images/image-3/chalkboard-with-financial-planning-text-piggy-bank.jpg";
const Welcome = () => {
  return (
    <div>
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
            src={image3}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
export default Welcome;
