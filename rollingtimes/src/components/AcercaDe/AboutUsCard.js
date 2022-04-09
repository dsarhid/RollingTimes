import React from "react";
import { Card } from "react-bootstrap";
import './AboutUs.css'

const AboutUsCard = (props) => {
  return (
    <div className="d-flex row justify-content-center mb-5">
      <Card className="about-cardRounded bg4 text-center" id="about-cardRounded" style={{ width: props.width }}>
        <Card.Img className="about-cardRounded2" id="about-cardRounded2" variant="bottom,top" src={props.image} />
        <Card.Body>
          <Card.Title> <h4>{props.title}</h4> </Card.Title>
          <div>
            <h6>{props.text1}</h6>
          </div>
          <div>
            <p className="small">{props.text2}</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AboutUsCard;
