import React from "react";

const Navbar = () => {
  return (
    <nav className="flex flex-col lg:flex-row justify-between items-center py-3 mx-6 mb-7 ">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-600">
          {new Date().toUTCString().slice(0, 16)}
        </h3>
        <h1 className="text-2xl font-bold">DC FC Service</h1>
      </div>
      <div className="">
        <input
          type="search"
          name="search"
          id=""
          placeholder="Search here"
          autoComplete="off"
          className="p-3 border border-gray-400 bg-[#F5EFFF] rounded-lg text-sm outline-none w-[90vw] lg:w-[25vw] "
        />
      </div>
    </nav>
  );
};

export default Navbar;
