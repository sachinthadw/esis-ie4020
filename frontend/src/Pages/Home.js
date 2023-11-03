import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar_Home from '../Components/Home/NavBar_Home';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import '../Assets/Styles/Slider.css'
import axios from '../Components/config/axiosConfig';
function Home() {
  useEffect(() => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = document.querySelectorAll('.navbar-burger')

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });

  }, [])


  const slideImages = [
    {
      url: 'https://raw.githubusercontent.com/brixiobodino/coffeholic/main/banner.jpg',
      // caption: 'Slide 1'
    },
    {
      url: 'https://i.ytimg.com/vi/586CpeypGkQ/maxresdefault.jpg',
      // caption: 'Spider Man'
    },
    {
      url: 'https://images.indianexpress.com/2022/05/doctor-strange-madness-multiverse-review-.jpg',
      // caption: 'Doctor Strange'
    },
  ];

  return (

    <>
      <NavBar_Home />

      <div className='home-div'> </div>

      <section className="hero is-fullheight-with-navbar all-home-flexs">
        {/* <div className="slide-container">
          <Slide>
            {slideImages.map((slideImage, index) => (
              <div className="each-slide" key={index}>
                <div style={{ 'backgroundImage': `url(${slideImage.url})` }}>
                  <span>{slideImage.caption}</span>
                </div>
              </div>
            ))}
          </Slide>
        </div> */}
        <div className="hero-body ">
          <div className="container ">
            <div className='is-vcentered '>
              <div className='content '>
                <div className='columns'>

                  {/* Landing page Title */}
                  <div className="column is-5 is-align-self-center">
                    <h1 className="title is-1 is-light is-semibold is-spaced main-title has-text-white  has-text-centered">Get Your All Movies </h1>
                    <h2 className="subtitle is-5 is-light is-thin has-text-white has-text-centered">
                      Netflix, Amazon Prime, Hindi, English , Korean
                    </h2>
                    {/* CTA */}
                    <div className="buttons is-justify-content-center">
                      <Link to="/all"><button className="button is-success">Go to All Movies</button></Link>
                    </div>
                  </div>
                  {/* Hero image */}
                  <div className="column is-7">
                    {/* <figure className="image" style={{ width: '70%' }}>
                      <img src={netflix} alt="Pipeline SVG" />
                    </figure> */}
                    <div className="slide-container">
                      <Slide>
                        {slideImages.map((slideImage, index) => (
                          <div className="each-slide" key={index}>
                            <div style={{ 'backgroundImage': `url(${slideImage.url})` }}>
                              {/* <span>{slideImage.caption}</span> */}
                            </div>
                          </div>
                        ))}
                      </Slide>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>

  )
}

export default Home