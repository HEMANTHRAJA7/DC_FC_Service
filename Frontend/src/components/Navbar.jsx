import React from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../redux/slices/SearchSlice";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="relative flex flex-col lg:flex-row justify-between items-center py-3 mx-6 mb-7">
      <div className="mb-5">
        <h3>{user.username}</h3>
        <h3 className="text-xl font-bold text-gray-600">
          {new Date().toUTCString().slice(0, 16)}
        </h3>
        <h1 className="text-2xl font-bold">DC FC Service</h1>
      </div>

      <button
        onClick={handleClick}
        className="absolute top-3 right-0 p-3  bg-[#A294F9] text-white hover:bg-[#500073] rounded-lg cursor-pointer text-lg lg:hidden"
      >
        Logout
      </button>

      <div className="m-6 flex flex-col lg:flex-row lg:items-center">
        <input
          type="search"
          name="search"
          placeholder="Search here"
          autoComplete="off"
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="p-3 border border-gray-400 bg-[#F5EFFF] rounded-lg text-sm outline-none w-[90vw] lg:w-[25vw]"
        />
        <button
          onClick={handleClick}
          className="hidden lg:block mx-5 p-2 bg-[#A294F9] text-white hover:bg-[#500073] rounded-lg cursor-pointer text-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
