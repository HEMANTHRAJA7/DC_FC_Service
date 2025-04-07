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
    const fetchOrderHistory = async () => {
      setLoading(true);
      setError(null);
      
      if (!user) {
        setError("You must be logged in to view order history");
        setLoading(false);
        return;
      }

      try {
        // Using the correct API URL
        const response = await fetch('http://localhost:8000/food/', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        // Check for non-JSON responses
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response from server");
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch order history');
        }

        const data = await response.json();
        setOrderHistory(data);
      } catch (err) {
        console.error("Error fetching order history:", err);
        setError(err.message || "Failed to load order history");
      } finally {
        setLoading(false);
      }
    };

    if (activeHistory && user) {
      fetchOrderHistory();
    }
  }, [activeHistory, user]);

  const handleReorder = async (order) => {
    if (!user) {
      toast.error('You must be logged in to place an order');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/food/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          food_item: order.food_item,
          No_of_items: order.No_of_items,
          Total_amount: order.Total_amount
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to place order');
      }

      toast.success('Order placed successfully!');
      
      // Refresh order history
      setLoading(true);
      const historyResponse = await fetch('http://localhost:8000/food/', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (historyResponse.ok) {
        const newData = await historyResponse.json();
        setOrderHistory(newData);
    
      }
      setLoading(false);
    } catch (err) {
      console.error("Reorder error:", err);
      toast.error(err.message || 'Something went wrong');
    }
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
            <div className="text-center p-5">
              <h2 className="text-xl text-red-500">{error}</h2>
              <button 
                className="mt-3 bg-[#A294F9] text-white py-2 px-4 rounded-md hover:bg-[#500073]"
                onClick={() => activeHistory && user && fetchOrderHistory()}
              >
                Try Again
              </button>
            </div>
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
                        {/* <button
                          className="flex-1 bg-[#A294F9] text-white py-1 rounded-md text-sm hover:bg-[#500073]"
                          onClick={() => handleReorder(order)}
                        >
                          Reorder
                        </button> */}
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
      
      {/* Fixed position history button */}
      <div className="fixed bottom-5 right-5 z-40">
        <FaHistory
          onClick={() => setActiveHistory(!activeHistory)}
          className="text-7xl bg-[#A294F9] shadow-lg shadow-[#A294F9] p-3 rounded-3xl fixed bottom-5 right-25 text-white"
        />
      </div>
    </div>
  );
};

export default History;