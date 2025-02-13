import React from "react";
import Navbar from "../components/Navbar"
import CategoryMenu from "../components/CaregoryMenu"
import FoodItems from "../components/FoodItems";

const Home = () => {
  return (
    <div>
        <Navbar />
        <CategoryMenu />
        <FoodItems />
    </div>
  );
};

export default Home;
