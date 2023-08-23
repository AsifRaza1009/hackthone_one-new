import React from "react";
import { client } from "../../../sanity/lib/client";
import type { Image as Iimage } from "sanity";
import Image from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import { pic5, pic6 } from "@/components/assets";
import Link from "next/link";

export interface SanityDataType {
  name: string;
  slug: {
    current:string
  };
  price: number;
  image: Iimage[];
  details: string;
  care: string;
  type: string;
  category: {
    name: string;
  };
}

const getSanityData = () => {
  const response = client.fetch(`*[_type=='product']`);
  return response;
};

export default async function page() {
  const sanityData = await getSanityData();

  return (
    <>
      <div className="bg-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4  pt-10 md:py-20 px-16 md:px-14 justify-center">
        {sanityData?.map((item: SanityDataType, index: number) => (
         
         <Link href={`/product/${item.slug.current}`} key="index" className="">
            <Image
              src={urlForImage(item.image[0]).url()}
              alt=""
              width={250}
              height={250}
              className="hover:scale-110 ease-in duration-300"
            ></Image>
            <p className="font-semibold text-blue-500">{item.name}</p>
            <p className="text-green-600">{item.type}</p>
            <p className="font-bold text-red-600">$ {item.price}.00</p>
          </Link>
        ))}
      </div>
    </>
  );
}
