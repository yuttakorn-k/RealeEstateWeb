import React from 'react'
import './Hero.css'
import {HiLocationMarker} from 'react-icons/hi';
import {FaSearch} from 'react-icons/fa';
import CountUp from "react-countup";

const Hero = () => {
  return (
    <section className='hero-wrapper'>
        <div className='paddings innerWidth flexCenter hero-container'>
            
            <div className="flexColStart hero-left">
                <div className="hero-title">
                    <div className="orange-circle"/>
                    <h1>
                        Move Smarter <br/>
                        Live Better <br/> More Comfy.
                    </h1>
                </div>

                <div className='flexColStart hero-des'>
                    <span className='secondaryText'>Find a variety of properties that suit you very easily</span>
                    <span className='secondaryText'>Forget all difficulties in finding a residence for you</span>
                </div>

             <div className='flexCenter search-bar'>
                <div className='search-input-container'>
                  <HiLocationMarker className="search-icon" color="#de0a26" size={26}/>
                  <input type="text" className="search-input" placeholder='Search'/>
                  </div>
                  <button className='search-btn'><FaSearch/></button>
              </div>

              <div className='flexCenter stats'>
                <div className="flexColCenter stat">
                  <span><CountUp start={1000} end={2000} duration={4}/>
                  <span>+</span></span>
                  <span className='secondaryText'>Properties</span>
                </div>

                <div className="flexColCenter stat">
                  <span><CountUp start={100} end={500} duration={4}/>
                  <span>+</span></span>
                  <span className='secondaryText'>Sold Over</span>
                </div>

                <div className="flexColCenter stat">
                  <span><CountUp start={600} end={1000} duration={4}/>
                  <span>+</span></span>
                  <span className='secondaryText'>Reviews</span>
                </div>
              </div>
            </div>

            <div className='flexCenter hero-right'>
                <div className='image-container'>
                    <img className='image-container-row-2' src="./hero-image.png" alt="" />
                    <img src="./hero-image.jpg" alt="" />
                    <img src="./hero-image2.jpg" alt="" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero