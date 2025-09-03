// ReservationsPage.js
import React, { useState } from "react";
import CreateReservation from "./createReservation";
import ReservationList from "./reservationList";
import reservationsData from "./reservations"; 

const ReservationsPage = () => {
  const [reservations, setReservations] = useState(reservationsData);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Reservations</h2>

      <CreateReservation
        onAdd={(newReservation) => {
          setReservations((prev) => [newReservation, ...prev]);
        }}
      />
      <ReservationList
        reservations={reservations}
        setReservations={setReservations}
      />
    </div>
  );
};

export default ReservationsPage;
