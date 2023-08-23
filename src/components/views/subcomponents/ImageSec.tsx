"use client";

import Image from "next/image";
import React, { useState } from "react";

// this is the Image section components use in single product detail page

interface ImageSecProp {
  urls: string[];
}

export const ImageSec: React.FC<ImageSecProp> = ({ urls }) => {
  const [selectIndex, setSelectIndex] = useState(0);
  console.log(selectIndex,urls[selectIndex])

  return (
    <>
      <div className="flex space-x-10">
        <div className="flex flex-col space-y-5 md:space-y-6 ">
          {urls.map((item: string, index: number) => (
            <Image
              key={index}
              src={item}
              alt=""
              width={75}
              height={75}
              onMouseOver={() => {
                setSelectIndex(index);
              }}
            ></Image>
          ))}
        </div>

        <div className="">
          <Image
            src={urls[selectIndex]}
            alt=""
            width={450}
            height={450}
          ></Image>
        </div>
      </div>
    </>
  );
};
