"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { hero1GirlImage } from "@/components/assets";
import { CartItem } from "@/db/schema/script";
import { toast } from "react-hot-toast";
import { headers } from "next/dist/client/components/headers";
import { getUserIdentifier } from "@/lib/cookies";

export default function () {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [bDisabled, setBDisabled] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const userId = getUserIdentifier() as string;

  async function cartDetail(userId:string) {
    setCartItems([]);
    fetch(`${baseUrl}api/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${userId}`,
      },
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.length != 0) {
          setCartItems(response);
        }
      })
      .finally(() => {
        setLoading(false);
      });



  }
  
  useEffect(() => {
    cartDetail(userId)
    setLoading(true);
  }, []);

  return (
    <>
      <div className="pb-10">
        <h2 className="text-3xl font-bold py-10 px-24 ">Shopping Cart</h2>
        <div className=" flex flex-col md:flex-row md:space-x-3 justify-around">
          <div className="flex flex-col space-y-3">
            {cartItems.map((data, index) => (
              <div
                key={index}
                className="bg-gray-100 flex flex-col md:flex-row space-x-10 items-center justify-around "
              >
                <div className="">
                  <Image
                    src={data.product_image_url}
                    alt=""
                    height={400}
                    width={300}
                  ></Image>
                </div>
                <div className="text-justify p-4">
                  <h2 className="text-lg md:text-xl font-semibold">
                   Name: {data.product_name}
                  </h2>
                  <p className="text-gray-500 text-md font-semibold">
                   Type :<span className="text-red-500 rounded-lg px-2 py-1 text-lg"> {data.product_type}</span>
                  </p>
                  <p className="text-gray-500 text-md font-semibold pt-2">
                   Size : <span className="text-red-500  text-lg"> {data.product_size}</span>
                  </p>
                  <p className="py-2  text-green-500 text-md md:text-xl font-semibold">
                    Delivery Estimation : 5 Days
                  </p>
                  <p className=" text-md md:text-xl font-semibold">
                   Qunantity : <span className="text-red-500 text-xl"> {data.product_quantity}</span>
                  </p>
                  <p className="font-semibold text-lg md:text-xl pb-7">
                  Price per Unit : <span className="text-red-500 text-xl">$ {data.product_price}</span>
                  </p>

                  <button className="px-2 py-1 text-center bg-red-400 rounded-lg text-white">
                    Delete{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 ">
            <h2 className="font-bold text-xl px-4 py-6">Order Summary</h2>
            <p className="p-4">
              Quantity <span className=""> 5 Products</span>
            </p>
            <p className="pb-4 p-4">
              Sub Total<span className="pl-2 font-semibold">= $ 545.00</span>
            </p>
            <button className="tracking-widest bg-[#474747] px-4 md:px-12 w-fit mx-auto py-2 border border-transparent rounded-lg font-bold items-center text-white">
              Process to checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
