import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); // Use the login function from context
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data sent to backend:", credentials);
    try {
      const res = await axios.post(
        "http://localhost:1234/api/auth/login",
        credentials
      );
      console.log("Backend Response:", res.data);

      // Use login function from AuthContext
      login(res.data.accessToken, res.data.refreshToken); // Pass both tokens to the login function

      setError("");
      console.log("Navigating to /products");
      navigate("/products");
    } catch (error) {
      console.error("Login Error:", error);
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border shadow-md">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          className="block w-full p-2 border mb-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="block w-full p-2 border mb-3"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
