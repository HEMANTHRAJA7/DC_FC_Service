import React from "react";
import { FaStar } from "react-icons/fa";

const FoodCard = () => {
  return (
    <div className="font-bold w-[250px] bg-[#F5EFFF] p-5 rounded-lg  flex flex-col">
      <img
        src="https://img.freepik.com/free-photo/seafood-pizza_74190-5944.jpg?w=996&t=st=1693062328~exp=1693062928~hmac=53fd9ad496580db41c6ca8066510cd89c6b0a0389de8bb6b875a78a1eda09cb5"
        alt=""
        className="rounded-lg w-auto h-[130px] hover:scale-110 cursor-grab transition-all duration-500 ease-in-out"
      />
      <div className="flex justify-between mt-2 text-sm">
        <h2>Onion Pizza</h2>
        <span className="text-green-500">₹180</span>
      </div>
      <p className="text-sm font-normal mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
        voluptatum.
      </p>
      <div className="flex justify-between mt-2 items-center">
        <span className="flex">
        <FaStar className="text-yellow-400 mt-1 mr-1" /> 4.5
        </span>
        <button className="bg-[#A294F9] text-white p-1.5 hover:bg-[#500073] rounded-lg cursor-grab text-sm">Add to cart</button>
      </div>
    </div>
  );
};

export default FoodCard;
