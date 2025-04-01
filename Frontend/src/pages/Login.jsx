import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom"; // Assuming you are using react-router

const Login = () => {
  const [email, setEmail] = useState("");  // Use setEmail instead of isEmail
  const [password, setPassword] = useState(""); // Use setPassword instead of isPassword
  const { login, error, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh when the form is submitted
    login(email, password);
  };

  return (
    <div className="flex h-screen items-center justify-center px-6 md:px-10">
      <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">LOGIN</h2>
        <form onSubmit={handleSubmit}> {/* Corrected to handle form submit */}
          <div>
            <label className="block font-medium text-gray-700">E-Mail</label>
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
          <button
            disabled={loading}
            type="submit" // Removed unnecessary onClick
            className="w-full mt-6 bg-[#A294F9] text-white font-bold uppercase py-2 rounded-md hover:brightness-95 active:scale-95"
          >
            Submit
          </button>
          {error && <div>{error}</div>}
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
