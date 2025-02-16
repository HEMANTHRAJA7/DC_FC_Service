import React from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const ItemCard = ({id,name,img,price,qty}) => {
  return (
    <div>
      <div className=" m-5 px-3 py-3 flex items-center bg-[#E5D9F2] shadow-md shadow-[#E5D9F2] rounded-lg relative">
        <img
          src={img}
          alt=""
          className="w-[50px] h-[50px] rounded-lg"
        />
        <div className="flex flex-col ml-3">
          <div className="flex ">
            <span className="">{name}</span>
            <div>
              <MdDelete className="absolute right-7 text-gray-600 cursor-pointer" />
            </div>
          </div>
          <div className="flex">
            <span>₹{price}</span>
            <div className="flex justify-center items-center gap-2 absolute right-7">
              <AiOutlineMinus className="border-2 border-gray-600 text-gray-600 hover:text-white hover:bg-red-500 hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer" />
              <span>{qty}</span>
              <AiOutlinePlus className="border-2 border-gray-600 text-gray-600 hover:text-white hover:bg-green-500 hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ItemCard;
