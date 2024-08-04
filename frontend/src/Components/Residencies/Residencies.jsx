import React, { useState, useEffect } from 'react';
import 'swiper/css';
import './Residencies.css';
import data from '../../utils/slider.json';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { SliderSettings } from '../../utils/common';
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";

const Residencies = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Extend SliderSettings with an onSlideChange event handler
  const sliderSettingsWithHandler = {
    ...SliderSettings,
    onSlideChange: (swiper) => {
      setActiveIndex(swiper.activeIndex);
      setIsAtEnd(swiper.isEnd);
    },
    onSwiper: (swiper) => setSwiperInstance(swiper), // Capture Swiper instance
  };

  return (
    <section className='r-wrapper'>
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className='orangeText'>Best Choices</span>
          <span className='primaryText'>Popular Properties</span>
        </div>

        <Swiper {...sliderSettingsWithHandler}>
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <div className='flexColStart r-card'>
                <img src={card.image} alt="home" />
                <span className='secondaryText r-price'>
                  <span style={{ color: "orange" }}>$</span>
                  <span>{card.price}</span>
                </span>
                <span className='primaryText'>{card.name}</span>
                <span className='secondaryText'>{card.detail}</span>
              </div>
            </SwiperSlide>
          ))}
          <SliderButtons swiper={swiperInstance} activeIndex={activeIndex} isAtEnd={isAtEnd} />
        </Swiper>
      </div>
    </section>
  );
};

export default Residencies;

const SliderButtons = ({ swiper, activeIndex, isAtEnd }) => {
  if (!swiper) return null; // Avoid rendering buttons if swiper instance is not available

  const totalSlides = swiper.slides.length;
  const isAtStart = activeIndex === 0;

  return (
    <div className="flexCenter r-buttons">
      <button
        className={isAtStart ? 'button-gray' : 'button-white'}
        onClick={() => swiper.slidePrev()}
        disabled={isAtStart}
      >
        <IoMdArrowDropleft size={20} />
      </button>
      <button
        className={isAtEnd ? 'button-gray' : 'button-white'}
        onClick={() => swiper.slideNext()}
        disabled={isAtEnd}
      >
        <IoMdArrowDropright size={20} />
      </button>
    </div>
  );
};
