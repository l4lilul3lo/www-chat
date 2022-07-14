import { useState } from "react";
import "./auth.css";
import { register } from "../../api";
import { Link } from "react-router-dom";
const Register = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const message = await register(formData);
    setMessage(message);
  }

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="auth-container">
      <div className="auth-background">
        <img src="logo-small.png" />
        <h1>Register</h1>
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
            autoComplete="on"
          />
          <input id="register-submit-btn" type="submit" />
        </form>
        <p>
          Already have an account? You can log in <Link to="/login">here</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
