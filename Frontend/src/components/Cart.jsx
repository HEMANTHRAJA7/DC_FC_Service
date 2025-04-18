import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useSelector } from 'react-redux';
import { AiOutlineClose } from "react-icons/ai";
import ItemCard from "./ItemCard";
import { CgShoppingCart } from "react-icons/cg";
import { useNavigate } from "react-router-dom";


const Cart = ({ activeCart, setActiveCart }) => {
  const { user } = useAuthContext();
  const cartItems = useSelector((state) => state.cart.cart);
  const totalQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  const totalPrice = cartItems.reduce((totalPrice, item) => totalPrice + item.qty * item.price, 0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const foodOrder = {
      food_item: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.qty
      })),
      No_of_items: totalQty,
      Total_amount: totalPrice
    };

    try {
      console.log("Sending data:", JSON.stringify(foodOrder, null, 2));
      const response = await fetch('http://localhost:8000/food/', {
        method: 'POST',
        body: JSON.stringify(foodOrder),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      let json = {};
      if (response.headers.get("Content-Type")?.includes("application/json")) {
        json = await response.json();
      }

      if (!response.ok) {
        console.error("Error from server:", json);
        setError(json.error || "Failed to place order");
      } else {
        setError(null);
        navigate("/success", { state: { cartItems } });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("An error occurred while placing the order.");
    }
  };

  return (
    <div>
      <div
        className={`fixed right-0 top-0 bg-[#F5EFFF] w-full lg:w-[20vw] h-full ${
          activeCart ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center p-5">
          <span className="text-xl font-bold text-gray-800">Cart</span>
          <AiOutlineClose
            onClick={() => setActiveCart(!activeCart)}
            className="text-xl border-2 rounded-md text-gray-600 border-gray-600 font-bold hover:text-red-300 hover:border-red-300"
          />
        </div>

        <div className="overflow-y-auto scrollbar-hide max-h-[70vh] ">
          {cartItems.length > 0 ? (
            cartItems.map((food) => (
              <ItemCard
                key={food.id}
                id={food.id}
                name={food.name}
                price={food.price}
                img={food.img}
                qty={food.qty}
              />
            ))
          ) : (
            <h2 className="text-center text-xl text-gray-500">
              Your cart is empty
            </h2>
          )}
        </div>

        <div className="absolute bottom-0 p-5">
          <h3 className="font-semibold text-gray-800">Items: {totalQty}</h3>
          <h3 className="font-semibold text-gray-800">
            Total amount: {totalPrice}
          </h3>
          <hr className="w-[90vw] lg:w-[18vw] my-2" />
          <button
            onClick={handleSubmit}
            className="bg-[#A294F9] text-white p-1.5 hover:bg-[#500073] px-3 py-2 mb-5 rounded-lg cursor-pointer font-bold w-[90vw] lg:w-[18vw]"
          >
            Place order
          </button>
        </div>
      </div>
      <CgShoppingCart
        onClick={() => setActiveCart(!activeCart)}
        className={`text-7xl bg-[#A294F9] shadow-lg shadow-[#A294F9] p-3 rounded-3xl fixed bottom-5 right-5 text-white ${
          totalQty > 0 && "animate-bounce delay-500 transition-all"
        }`}
      />
    </div>
  );
};

export default Cart;