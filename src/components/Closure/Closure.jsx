import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Banner1 from '../../assets/banner1.png';
import Banner2 from '../../assets/banner2.png';
import Banner3 from '../../assets/banner3.png';

export default function Closure() {
  return (
    <>
    <Carousel fade>
      <Carousel.Item>
        <img src={Banner1} style={{maxHeight:'70%', maxWidth:"100%"}}/>
      </Carousel.Item>
      <Carousel.Item>
      <img src={Banner2} style={{maxHeight:'70%', maxWidth:"100%"}}/>
      </Carousel.Item>
      <Carousel.Item>
      <img src={Banner3} style={{maxHeight:'70%', maxWidth:"100%"}}/>
      </Carousel.Item>
    </Carousel>
    </>
  )
}
