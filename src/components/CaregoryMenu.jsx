import React, { useState, useEffect } from "react";
import FoodDate from "../data/FoodData";

const CaregoryMenue = () => {
  const [categories, setCategories] = useState([]);
  const listUniqueCategoties = () => {
    const uniqueCategories = [
      ...new Set(FoodDate.map((food) => food.category)),
    ];

    setCategories(uniqueCategories);
    console.log(uniqueCategories);
  };

  useEffect(() => {
    listUniqueCategoties();
  }, []);
  return (
    <div className="ml-6 mb-6 flex flex-col justify-center items-center">
      <h3 className="text-xl font-semibold">Find the best food</h3>
      <div className="my-5 flex gap-3 flex-wrap">
        <button className="px-[1rem] py-[0.5rem] bg-[#F5EFFF] font-bold rounded-lg hover:bg-[#A294F9] hover:text-white">
          All
        </button>

        {categories.map((category, id) => {
          return (
            <button
              key={id}
              className="px-[1rem] py-[0.5rem] bg-[#F5EFFF] font-bold rounded-lg hover:bg-[#A294F9] hover:text-white"
            >
              {category}
            </button>
          );
        })}
        {/* 
        <button className="px-[1rem] py-[0.5rem] bg-[#F5EFFF] font-bold rounded-lg hover:bg-[#A294F9] hover:text-white">
          Lunch
        </button>
        <button className="px-[1rem] py-[0.5rem] bg-[#F5EFFF] font-bold rounded-lg hover:bg-[#A294F9] hover:text-white">
          Breakfast
        </button>
        <button className="px-[1rem] py-[0.5rem] bg-[#F5EFFF] font-bold rounded-lg hover:bg-[#A294F9] hover:text-white">
          Dinner
        </button>
        <button className="px-[1rem] py-[0.5rem] bg-[#F5EFFF] font-bold rounded-lg hover:bg-[#A294F9] hover:text-white">
          Snacks
        </button> */}
      </div>
    </div>
  );
};

export default CaregoryMenue;
