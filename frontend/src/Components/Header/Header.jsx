import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <section className='h-wrapper'>
        <div className='flexCenter paddings innerWidth h-container'>

            <img src="./logo4.png" alt="logo" width={100}/>

            <div className='flexCenter h-menu'>
                <a href="">Buy</a>
                <a href="">Sell</a>
                <a href="">Rent</a>
                <a href="">Contact Us</a>
                <button className='shadow_btn'>Login</button>
            </div>
        </div>
    </section>
  )
}

export default Header