import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation";
import CreateReservation from "./components/createReservation";
import ReservationList from "./components/reservationList";
import reservationsData from "./components/reservations";

function App() {
  const [reservations, setReservations] = useState(reservationsData);

  const addReservation = (reservation) => {
    setReservations([...reservations, reservation]);
  };

  const deleteReservation = (id) => {
    setReservations(reservations.filter((r) => r.id !== id));
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/create-reservation"
          element={<CreateReservation addReservation={addReservation} />}
        />
        <Route
          path="/reservations"
          element={
            <ReservationList
              reservations={reservations}
              deleteReservation={deleteReservation}
            />
          }
        />
        <Route
          path="/"
          element={
            <div className="container mt-5">
              <h1>Welcome to Canada Parks Reservations</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

