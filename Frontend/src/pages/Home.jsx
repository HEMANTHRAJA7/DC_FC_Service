// import React,{useState} from "react";
// import Navbar from "../components/Navbar"
// import CategoryMenu from "../components/CaregoryMenu"
// import FoodItems from "../components/FoodItems"
// import Cart from "../components/Cart";
// import History from "../components/History"

// const Home = () => {

//   const [activeCart, setActiveCart] = useState(false);
//   const [activeHistory, setActiveHistory] = useState(false);

//   return (
//     <div className={`${activeCart ? "lg:w-[80vw]" : "lg:w-[100vw]"} transition-all duration-500 ease-in-out`}>
//         <Navbar />
//         <CategoryMenu />
//         <FoodItems />
//         <Cart activeCart={activeCart} setActiveCart={setActiveCart} />
//         <History activeHistory={activeHistory} setActiveCart={setActiveHistory} />
//     </div>
//   );
// };

// export default Home;


import React, { useState } from "react";
import Navbar from "../components/Navbar"
import CategoryMenu from "../components/CaregoryMenu"
import FoodItems from "../components/FoodItems"
import Cart from "../components/Cart";
import History from "../components/History"

const Home = () => {
  const [activeCart, setActiveCart] = useState(false);
  const [activeHistory, setActiveHistory] = useState(false);

  return (
    <div className={`${activeCart || activeHistory ? "lg:w-[80vw]" : "lg:w-[100vw]"} transition-all duration-500 ease-in-out`}>
        <Navbar />
        <CategoryMenu />
        <FoodItems />
        <Cart activeCart={activeCart} setActiveCart={setActiveCart} />
        <History activeHistory={activeHistory} setActiveHistory={setActiveHistory} />
    </div>
  );
};

export default Home;