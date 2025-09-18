import React, { useState } from "react";
import CreateReservation from "./createReservation";
import ReservationList from "./reservationList";
import reservationsData from "./reservations"; 

const ReservationsPage = () => {
  const [reservations, setReservations] = useState(reservationsData);

  const handleAddReservation = (newReservation) => {
    setReservations((prev) => [newReservation, ...prev]);
  };

  const handleDeleteReservation = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this reservation?");
    if (!confirmed) return;

    setReservations((prev) => prev.filter((res) => res.id !== id));

  };

  return (
    <div className="reservations-page container mt-5">
      <h2 className="mb-4 text-center">Manage Reservations</h2>

      <CreateReservation onAdd={handleAddReservation} />

      <ReservationList
        reservations={reservations}
        onDelete={handleDeleteReservation} // pass delete function
      />
    </div>
  );
};

export default ReservationsPage;
