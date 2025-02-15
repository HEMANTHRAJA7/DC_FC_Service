import React from "react";
import Navbar from "../components/Navbar"
import CategoryMenu from "../components/CaregoryMenu"
import FoodItems from "../components/FoodItems"
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div>
        <Navbar />
        <CategoryMenu />
        <FoodItems />
        <Cart />
    </div>
  );
};

export default Home;
