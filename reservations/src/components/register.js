import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (adminSecret) formData.append("adminSecret", adminSecret);

    try {
      const response = await fetch(
        "http://localhost/ReactApp2/reservations/reservation_server/api/register.php",
        { method: "POST", body: formData }
      );
      const data = await response.json();

      if (data.status === "success") {
        // ✅ Redirect to login page after successful registration
        navigate("/login");
      } else {
        setError(data.message || "Error registering user.");
      }
    } catch (err) {
      console.error(err);
      setError("Error registering user.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {error && <p className="text-danger">{error}</p>}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Admin Secret (optional)"
        value={adminSecret}
        onChange={(e) => setAdminSecret(e.target.value)}
      />

      <button type="submit" className="green-button">Register</button>
    </form>
  );
}

export default Register;
