import React from "react";
import Slider from "react-slick";
import "./Silder.css";

// slick-carousel의 스타일 import
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// SliderSettings 인터페이스 정의
interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  autoplaySpeed: number;
  prevArrow: JSX.Element;
  nextArrow: JSX.Element;
  fade: boolean;
}

const SlideShow = (): JSX.Element => {
  // 슬라이드 옵션 설정
  const settings: SliderSettings = {
    dots: true, // 페이지네이션(점) 표시 여부
    infinite: true, // 무한 루프 여부
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 개수
    autoplay: false, // 자동 슬라이드 여부
    autoplaySpeed: 3000, // 자동 슬라이드 전환 시간 (밀리초 단위)
    prevArrow: (
      <button className="slick-prev">
        <span style={{ fontSize: "30px", color: "black" }}></span>
      </button>
    ),
    nextArrow: (
      <button className="slick-next">
        <span style={{ fontSize: "30px", color: "black" }}></span>
      </button>
    ),
    fade: false, // 페이드 효과 설정 (기본값은 false로 설정)
  };

  return (
    <div className="slider-container">
      <h2>슬라이드쇼 예시</h2>
      <Slider {...settings}>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2025/01/26/08/38/heart-9360465_640.jpg"
            alt="Slide 1"
          />
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2023/01/30/14/50/women-7755902_640.png"
            alt="Slide 2"
          />
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2024/06/19/08/18/woman-8839452_640.jpg"
            alt="Slide 3"
          />
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2023/11/17/01/50/pine-8393456_640.jpg"
            alt="Slide 4"
          />
        </div>
      </Slider>
    </div>
  );
};

export default SlideShow;
