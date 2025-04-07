// import { useState } from 'react';
// import { useAuthContext } from '../hooks/useAuthContext';
// import { useSelector } from 'react-redux';
// import { AiOutlineClose } from "react-icons/ai";
// import ItemCard from "./ItemCard";
// import { FaHistory } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";


// const Cart = ({ activeCart, setActiveCart }) => {
//   const { user } = useAuthContext();
//   const cartItems = useSelector((state) => state.cart.cart);
//   const totalQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
//   const totalPrice = cartItems.reduce((totalPrice, item) => totalPrice + item.qty * item.price, 0);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       setError('You must be logged in');
//       return;
//     }

//     const foodOrder = {
//       food_item: cartItems.map(item => ({
//         name: item.name,
//         price: item.price,
//         quantity: item.qty
//       })),
//       No_of_items: totalQty,
//       Total_amount: totalPrice
//     };

//     try {
//       console.log("Sending data:", JSON.stringify(foodOrder, null, 2));
//       const response = await fetch('http://localhost:8000/food/', {
//         method: 'POST',
//         body: JSON.stringify(foodOrder),
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`
//         }
//       });

//       let json = {};
//       if (response.headers.get("Content-Type")?.includes("application/json")) {
//         json = await response.json();
//       }

//       if (!response.ok) {
//         console.error("Error from server:", json);
//         setError(json.error || "Failed to place order");
//       } else {
//         setError(null);
//         navigate("/success", { state: { cartItems } });
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       setError("An error occurred while placing the order.");
//     }
//   };

//   return (
//     <div>
//       <div
//         className={`fixed right-0 top-0 bg-[#F5EFFF] w-full lg:w-[20vw] h-full ${
//           activeCart ? "translate-x-0" : "translate-x-full"
//         } transition-all duration-500 ease-in-out z-50`}
//       >
//         <div className="flex justify-between items-center p-5">
//           <span className="text-xl font-bold text-gray-800">Cart</span>
//           <AiOutlineClose
//             onClick={() => setActiveCart(!activeCart)}
//             className="text-xl border-2 rounded-md text-gray-600 border-gray-600 font-bold hover:text-red-300 hover:border-red-300"
//           />
//         </div>

//         <div className="overflow-y-auto scrollbar-hide max-h-[70vh] ">
//           {cartItems.length > 0 ? (
//             cartItems.map((food) => (
//               <ItemCard
//                 key={food.id}
//                 id={food.id}
//                 name={food.name}
//                 price={food.price}
//                 img={food.img}
//                 qty={food.qty}
//               />
//             ))
//           ) : (
//             <h2 className="text-center text-xl text-gray-500">
//               Your cart is empty
//             </h2>
//           )}
//         </div>

//         <div className="absolute bottom-0 p-5">
//           <h3 className="font-semibold text-gray-800">Items: {totalQty}</h3>
//           <h3 className="font-semibold text-gray-800">
//             Total amount: {totalPrice}
//           </h3>
//           <hr className="w-[90vw] lg:w-[18vw] my-2" />
//           <button
//             onClick={handleSubmit}
//             className="bg-[#A294F9] text-white p-1.5 hover:bg-[#500073] px-3 py-2 mb-5 rounded-lg cursor-pointer font-bold w-[90vw] lg:w-[18vw]"
//           >
//             Place order
//           </button>
//         </div>
//       </div>
//       <FaHistory
//         onClick={() => setActiveHistory(!activeHistory)}
//         className={`text-7xl bg-[#A294F9] shadow-lg shadow-[#A294F9] p-3 rounded-3xl fixed bottom-5 right-25 text-white ${
//           totalQty > 0 && "animate-bounce delay-500 transition-all"
//         }`}
//       />
//     </div>
//   );
// };

// export default Cart;

import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { AiOutlineClose } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import toast from 'react-hot-toast';

const History = ({ activeHistory, setActiveHistory }) => {
  const { user } = useAuthContext();
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Use dummy data instead of fetching from backend
    const fetchDummyOrderHistory = () => {
      // Simulate API loading time
      setTimeout(() => {
        const dummyOrders = [
          {
            _id: "ord612345",
            food_item: [
              {
                name: "Margherita Pizza",
                price: 299,
                quantity: 2
              },
              {
                name: "Garlic Bread",
                price: 149,
                quantity: 1
              }
            ],
            No_of_items: 3,
            Total_amount: 747,
            user_id: "user123",
            createdAt: "2025-04-05T14:23:11.000Z"
          },
          {
            _id: "ord612346",
            food_item: [
              {
                name: "Chicken Burger",
                price: 199,
                quantity: 1
              },
              {
                name: "French Fries",
                price: 99,
                quantity: 1
              },
              {
                name: "Cold Coffee",
                price: 129,
                quantity: 2
              }
            ],
            No_of_items: 4,
            Total_amount: 556,
            user_id: "user123",
            createdAt: "2025-04-01T18:45:22.000Z"
          },
          {
            _id: "ord612347",
            food_item: [
              {
                name: "Paneer Tikka",
                price: 249,
                quantity: 1
              },
              {
                name: "Butter Naan",
                price: 49,
                quantity: 2
              },
              {
                name: "Dal Makhani",
                price: 199,
                quantity: 1
              }
            ],
            No_of_items: 4,
            Total_amount: 546,
            user_id: "user123",
            createdAt: "2025-03-28T12:15:09.000Z"
          }
        ];
        
        setOrderHistory(dummyOrders);
        setLoading(false);
      }, 1000); // Simulate 1 second loading time
    };

    if (activeHistory) {
      fetchDummyOrderHistory();
    }
  }, [activeHistory]);

  const handleReorder = (order) => {
    // Simulate reordering without backend connection
    toast.success('Order placed successfully!');
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div>
      <div
        className={`fixed right-0 top-0 bg-[#F5EFFF] w-full lg:w-[20vw] h-full ${
          activeHistory ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center p-5">
          <span className="text-xl font-bold text-gray-800">Order History</span>
          <AiOutlineClose
            onClick={() => setActiveHistory(!activeHistory)}
            className="text-xl border-2 rounded-md text-gray-600 border-gray-600 font-bold hover:text-red-300 hover:border-red-300"
          />
        </div>

        <div className="overflow-y-auto scrollbar-hide max-h-[88vh]">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#A294F9]"></div>
            </div>
          ) : error ? (
            <h2 className="text-center text-xl text-red-500 p-5">{error}</h2>
          ) : orderHistory.length > 0 ? (
            orderHistory.map((order) => (
              <div key={order._id} className="m-4 bg-white rounded-lg shadow-md">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </span>
                    <span className="text-sm font-semibold text-[#A294F9]">
                      #{order._id.slice(-6)}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  {selectedOrder === order._id ? (
                    <div>
                      {order.food_item.map((item, index) => (
                        <div key={index} className="mb-2 flex justify-between items-center">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">₹{item.price} x {item.quantity}</p>
                          </div>
                          <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="flex justify-between text-sm">
                          <span>Items:</span>
                          <span>{order.No_of_items}</span>
                        </div>
                        <div className="flex justify-between font-bold mt-1">
                          <span>Total:</span>
                          <span>₹{order.Total_amount.toFixed(2)}</span>
                        </div>
                      </div>
                      <button
                        className="mt-3 w-full bg-gray-100 text-gray-700 py-1 rounded-md text-sm"
                        onClick={() => setSelectedOrder(null)}
                      >
                        Hide Details
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between mb-2">
                        <div>
                          <p className="font-semibold">{order.No_of_items} Items</p>
                          <p className="text-sm text-gray-500">
                            {order.food_item.slice(0, 2).map((item) => item.name).join(', ')}
                            {order.food_item.length > 2 ? ' ...' : ''}
                          </p>
                        </div>
                        <p className="font-bold">₹{order.Total_amount.toFixed(2)}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="flex-1 bg-gray-100 text-gray-700 py-1 rounded-md text-sm"
                          onClick={() => setSelectedOrder(order._id)}
                        >
                          View Details
                        </button>
                        <button
                          className="flex-1 bg-[#A294F9] text-white py-1 rounded-md text-sm hover:bg-[#500073]"
                          onClick={() => handleReorder(order)}
                        >
                          Reorder
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-center text-xl text-gray-500 p-10">
              No order history found
            </h2>
          )}
        </div>
      </div>
      
      <FaHistory
        onClick={() => setActiveHistory(!activeHistory)}
        className="text-7xl bg-[#A294F9] shadow-lg shadow-[#A294F9] p-3 rounded-3xl fixed bottom-20 right-5 text-white cursor-pointer"
      />
    </div>
  );
};

export default History;