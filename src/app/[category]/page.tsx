import React from "react";
import { client } from "../../../sanity/lib/client";
import { SanityDataType } from "../product/page";
import Image from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import Link from "next/link";

export async function generateStaticParams() {
  const categories: string[] = ["Male", "Female", "Kids"];

  return categories.map((item) => ({ category: item }));
}

const getCategoryID = async (category: string) => {
  const cat = category.charAt(0).toUpperCase() + category.slice(1);
  const response = await client.fetch(`*[_type=='category' && name=='${cat}']`);
  return response[0]._id || "";
};

const getData = async (catId: string) => {
  const response = await client.fetch(
    `*[_type=='product' && category._ref=='${catId}']`
  );
  return response;
};

export default async function category({
  params,
}: {
  params: { category: string };
}) {
  const catId = await getCategoryID(params.category);
  const data = await getData(catId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4  pt-10 md:py-20 px-16 md:px-14 justify-center">
      {data.map((item: SanityDataType, index: number) => (
        <Link href= {`/product/${item.slug.current}`}  key={index} className="">
          
          <Image
            src={urlForImage(item.image[0]).url()}
            alt=""
            width={250}
            height={250}
            className="hover:scale-110 ease-in duration-300"
          ></Image>
          <p className="font-semibold text-blue-500">{item.name}</p>
          <p className="text-green-600">{item.type}</p>
          <p className="text-red-600 font-bold">$ {item.price}.00</p>
        </Link>
      ))}
    </div>
  );
}
