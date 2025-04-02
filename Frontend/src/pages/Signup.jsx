import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom"; // Assuming you are using react-router

const Signup = () => {
  const [email, setEmail] = useState("");  // Corrected to setEmail
  const [password, setPassword] = useState(""); // Corrected to setPassword
  const [username, setUsername] = useState(""); // Corrected to setUsername
  const { signup, error, loading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh when the form is submitted
    await signup(email, password, username);
  };

  return (
    <div className="flex h-screen items-center justify-center px-6 md:px-10">
      <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">
          CREATE AN ACCOUNT
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium text-gray-700">Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)} // Updated to setEmail
              value={email}
              placeholder="Enter your email"
              className="w-full p-3 bg-[#F5EFFF] border-2 border-[#CDC1FF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#A294F9]"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mt-4">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)} // Updated to setPassword
              value={password}
              placeholder="Enter your password"
              className="w-full p-3 bg-[#F5EFFF] border-2 border-[#CDC1FF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#A294F9]"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mt-4">
              Username
            </label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)} // Updated to setUsername
              value={username}
              placeholder="Enter your username"
              className="w-full p-3 bg-[#F5EFFF] border-2 border-[#CDC1FF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#A294F9]"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full mt-6 bg-[#A294F9] text-white font-bold uppercase py-2 rounded-md hover:brightness-95 active:scale-95"
          >
            Submit
          </button>
          {error && <div>{error}</div>}
        </form>
        <p className="text-sm text-center mt-4">
          Have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
