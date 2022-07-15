import { useState } from "react";
import "./auth.css";
import { register } from "../../api";
import { Link } from "react-router-dom";
const Register = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    password2: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setMessage("Passwords do not match");
      return;
    }

    const message = await register(formData);
    setMessage(message);
  }

  function handleChange(e) {
    setMessage("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const successMessage = (
    <div>
      Registration Success <Link to="/login">Login</Link>{" "}
    </div>
  );

  return (
    <div className="auth-container">
      <div className="auth-background">
        <img src="logo-small.png" />
        <h1>Register</h1>
        <div className="auth-message">
          {message === "success" ? successMessage : message}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="name"
            id="username"
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
          <label htmlFor="password2">Retype Password</label>
          <input
            type="password"
            name="password2"
            id="password"
            onChange={handleChange}
          />
          <input id="auth-submit-btn" type="submit" />
        </form>
        <p>
          Already have an account? You can log in <Link to="/login">here</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
