import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { authorize } from "../../features/auth/authSlice";
import { login } from "../../api";
import "./auth.css";
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
      const message = await login(formData);

      if (message === "success") {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="auth-container">
      <div className="auth-background">
        <img src="logo-small.png" />
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">name</label>
            <input
              type="text"
              name="name"
              id="username"
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
          <input id="login-submit-btn" type="submit" />
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
