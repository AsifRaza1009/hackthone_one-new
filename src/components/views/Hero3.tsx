"use client"
import React, { ReactNode } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SanityDataType } from '@/app/product/page';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';
import Image from "next/image";


const getSanityData = () => {
  const response = client.fetch(`*[_type=='product']`);
  return response;
};

function SampleNextArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

export default async function Hero3() {
  const sanityData = await getSanityData();
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1439,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          
        }
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
        
      }
    ]
  };
  return(
    <>
    <div className='p-5 text-center space-y-3 '>
    <p className='text-blue-800 text-sm font-bold'>PRODUCTS</p>
    <h3 className=' text-2xl md:text-4xl font-semibold text-gray-700'>Check What We Have</h3>
    </div>
     <div className='px-0 pl-5 md:pl-0 md:px-24'>
    <Slider {...settings}>
     {sanityData?.map((item: SanityDataType, index: number) => (
          <div key="index" className="">
            <Image
              src={urlForImage(item.image[0]).url()}
              alt=""
              width={350}
              height={300}
              className="hover:scale-110 ease-in duration-300"
            ></Image>
            <p className="text-xs md:text-lg font-semibold text-blue-500">{item.name}</p>
            <p className="text-xs md:text-lg font-bold text-red-600">$ {item.price}.00</p>
      </div> 
       ))}
    </Slider>
       </div>
    </>

  )
}


