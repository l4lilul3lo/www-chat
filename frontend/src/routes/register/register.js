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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label for="name">Username</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
