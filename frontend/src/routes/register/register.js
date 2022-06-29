import { useState } from "react";
import "./register.css";
const Register = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setMessage(data.message);

    // response will be html or json
  }
  function handleChange(e) {
    console.log(e.target.value)
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label for="username">Username</label>
        <input
          type="text"
          name="name"
          id="username"
          
          onChange={handleChange}
        />
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          
          onChange={handleChange}
        />
        <input id="register-submit-btn" type="submit" />
      </form>
    </div>
  );
};

export default Register;
