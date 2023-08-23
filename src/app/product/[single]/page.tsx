import React from "react";
import { client } from "../../../../sanity/lib/client";
import { urlForImage } from "../../../../sanity/lib/image";
import type { Image as Iimage } from "sanity";
import { ImageSec } from "@/components/views/subcomponents/ImageSec";
import Detail from "@/components/views/subcomponents/Detail";

const getSanitySingleProductData = async (slug: any) => {
  const data = client.fetch(`*[_type=='product'&&slug.current=='${slug}']`);

  return data;
};

const getProductSlug = async () => {
  const slugData = await client.fetch(`*[_type=='product']{slug}`);
  return slugData;
};

export async function generateStaticParams() {
  let slug = await getProductSlug();
  let productSlug: string[] = [];
  slug.map((item: any) => {
    productSlug.push(item.slug.current);
  });
  return productSlug.map((slug: any) => ({ single: slug }));
}

export default async function page({ params }: { params: { single: string } }) {
  const sizes: string[] = ["XS", "S", "M", "L", "XL"];
  const productData = await getSanitySingleProductData(params.single);
  const singleProductData = productData[0];

  const productCare: string[] = [];
  singleProductData.care.map((item: { children: { text: string }[] }) => {
    productCare.push(item.children[0].text);
  });

  const productDetail: string[] = [];
  singleProductData.details.map((item: { children: { text: string }[] }) => {
    productDetail.push(item.children[0].text);
  });

  let imageUrl: string[] = [];
  singleProductData.image.map((ur: Iimage) =>
    imageUrl.push(urlForImage(ur).width(300).url())
  );

  return (
    <>
      <div className="py-4 lg:py-10 px-0 lg:px-16 m-10 bg-gray-50 flex flex-col lg:flex-row space-x-0 md:space-x-10 space-y-4 lg:space-y-0 ">
        <div className="">
          <ImageSec urls={imageUrl} />
        </div>
        <div className="">
          <Detail
            name={singleProductData.name}
            type={singleProductData.type}
            price={singleProductData.price}
            url={imageUrl[0]}
            slug={params.single}
          />
        </div>
      </div>
      <div className='justify-center relative'>
          {/* section 2 div start */}
          <div className=' border-b border-b-gray'>
            {/*div 2.1 start  */}
            <h1 className='text-xl md:text-2xl p-5 md:p-8 font-bold'>
              Product Information
            </h1>
            {/* div 2.1 end */}
          </div>

          <div className='flex flex-col md:flex-row md:text-start md:space-x-28 py-8 md:py-6 px-12 md:px-24 md:items-start '>
            {/* div 2.2 start */}
            <h2 className='md:w-2/3 text-md md:text-lg font-semibold text-gray-600'>
              PRODUCT DETAILS
            </h2>

            {productDetail.map((prodDetail: any, index1: number) => (
              <p key={index1} className='py-5 md:py-0 px-4 md:px-16'>
                {prodDetail}
              </p>
            ))}

            {/* div 2.2 end */}
          </div>
          <div className='flex flex-col md:flex-row py-2 md:py-5 px-10 md:px-24 '>
            {/* div 2.3 start */}
            <h2 className='md:w-1/3 text-md md:text-lg font-semibold text-gray-500'>
              PRODUCT CARE{" "}
            </h2>
            <ul className='md:font-semibold text-md md:text-lg py-4 md:py-0'>
              {productCare.map((careDetail: any, index2:number) => (
                <li key={index2}>{careDetail}</li>
              ))}
            </ul>
            {/* div 2.3 end */}
          </div>
          <div className='absolute inset-0 -z-50 justify-left p-14'>
            <div className='text-3xl font-bold text-gray-200 sm:text-9xl sm:font-extrabold'>
              <p>Overview </p>
            </div>
          </div>
          {/* section 2 div end */}
        </div>
    </>
  );
}
