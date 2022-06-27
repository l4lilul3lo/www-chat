import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { authorize } from "../../features/auth/authSlice";
import "./login.css";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {}
  }

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <img src="logo-small.png" />
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
              autoComplete="on"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password || ""}
              onChange={handleChange}
              required
              autoComplete="on"
            />
          </div>
          <input type="submit" />
        </form>
        <p>
          Don't have an account? You can sign-up{" "}
          <Link to="/register">here</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
