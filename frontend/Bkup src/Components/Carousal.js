import React, { useEffect } from 'react';
import image from '../Assets/bitsilicaa.jpg'
import image1 from '../Assets/download.jpeg'
import image2 from '../Assets/img.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';




const Carousal = () => {
  useEffect(() => {
    const carouselElement = document.querySelector('#myCarousel');
    if (carouselElement) {
      new window.bootstrap.Carousel(carouselElement, {
        interval: 2000,
        wrap: true
      });
    }
  }, []);
  return (
    <div className='main-content'>
      
    <div className="container">
    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
      <ol className="carousel-indicators">
        <li data-bs-target="#myCarousel" data-bs-slide-to="0" className="active"></li>
        <li data-bs-target="#myCarousel" data-bs-slide-to="1"></li>
        <li data-bs-target="#myCarousel" data-bs-slide-to="2"></li>
      </ol>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={image} className="d-block w-100" alt="Los Angeles" />
          <div className="carousel-caption">
            <h3>Los Angeles</h3>
            <p>LA is always so much fun!</p>
          </div>
        </div>

        <div className="carousel-item">
          <img src={image1} className="d-block w-100" alt="Chicago" />
          <div className="carousel-caption">
            <h3>Chicago</h3>
            <p>Thank you, Chicago!</p>
          </div>
        </div>

        <div className="carousel-item">
          <img src={image2} className="d-block w-100" alt="New York" />
          <div className="carousel-caption">
            <h3>New York</h3>
            <p>We love the Big Apple!</p>
          </div>
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

    </div>
  </div>
    </div>
);
};


export default Carousal;