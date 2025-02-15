import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import ItemCard from "./ItemCard"
import { useSelector } from "react-redux";

const Cart = () => {

  const cart = selector((state)=> state.cart.cart)

  return (
    <div>
      <div className="fixed right-0 top-0 bg-[#F5EFFF] w-full lg:w-[20vw] h-full">
        <div className="flex justify-between items-center p-5">
          <span className="text-xl font-bold text-gray-800">Cart</span>
          <AiOutlineClose className="text-xl border-2 rounded-md text-gray-600 border-gray-600 font-bold hover:text-red-300 hover:border-red-300" />
        </div>


        <ItemCard />
        <ItemCard />

        <div className="absolute bottom-0 p-5">
            <h3 className="font-semibold text-gray-800">Items: </h3>
            <h3 className="font-semibold text-gray-800">Total amount: </h3>
            <hr className="w-[90vw] lg:w-[18vw] my-2" />
            <button className="bg-[#A294F9] text-white p-1.5 hover:bg-[#500073] px-3 py-2 mb-5 rounded-lg cursor-pointer font-bold w-[90vw] lg:w-[18vw]">
                Place order
            </button>
        </div>

        

      </div>
    </div>
  );
};

export default Cart;
