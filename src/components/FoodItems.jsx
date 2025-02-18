import React from "react";
import FoodCard from "./FoodCard";
import FoodData from "../data/FoodData.js";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const FoodItems = () => {

  const category = useSelector((state) => state.category.category);
  const handelToast = (name) => toast.success(`Added ${name} to cart`);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-wrap justify-center gap-10 lg:justify-start mx-6 mb-10">
        {FoodData.filter((food) => {
          if (category === "All") {
            return food;
          } else {
            return food.category === category;
          }
        }).map((food) => (
            <FoodCard
              key={food.id}
              id={food.id}
              name={food.name}
              price={food.price}
              desc={food.desc}
              rating={food.rating}
              img={food.img}
              handelToast={handelToast}
            />
        ))}
      </div>
    </div>
  );
};

export default FoodItems;
