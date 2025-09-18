import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navigation from "./components/navigation";
import Register from "./components/register";
import Login from "./components/login";
import CreateReservation from "./components/createReservation";
import ReservationsPage from "./components/reservationPage";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation user={user} />
        <Routes>
          <Route path="/" element={<Navigate to="/reservations" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route
            path="/create-reservation"
            element={user ? <CreateReservation /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<h2 className="text-center mt-5">Page not found</h2>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

