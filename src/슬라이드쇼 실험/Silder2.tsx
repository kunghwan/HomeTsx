import React, { useState } from "react";
import Slider from "react-slick";

function Resizable() {
  const [display, setDisplay] = useState(true);
  const [width, setWidth] = useState(600);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <h2>Resizable Collapsible</h2>
      <button className="button" onClick={() => setWidth(width + 100)}>
        Increase
      </button>
      <button className="button" onClick={() => setWidth(width - 100)}>
        Decrease
      </button>
      <button className="button" onClick={() => setDisplay(!display)}>
        Toggle
      </button>
      <div
        style={{
          width: width + "px",
          display: display ? "block" : "none",
        }}
      >
        <Slider {...settings} className="border">
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2023/01/30/14/50/women-7755902_640.png"
              alt="Slide 1"
            />
          </div>
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2024/10/06/11/54/cows-9099843_640.jpg"
              alt="Slide 2"
            />
          </div>
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2023/01/30/14/50/women-7755902_640.png"
              alt="Slide 3"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Resizable;
