import React from "react";
import "./reservationList.css";

function ReservationList({ reservations, deleteReservation }) {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations available</p>
      ) : (
        <div className="row">
          {reservations.map((res) => (
            <div className="col-md-4" key={res.id}>
              <div className="card mb-4">
                <div className="card-body text-center">
                  <h5 className="card-title">{res.name}</h5>
                  <p className="card-text">{res.location}</p>
                  <p className="card-text">{res.date}</p>
                  <p className="card-text">{res.time}</p>
                  <img
                    src={res.photo}
                    alt={res.name}
                    className="img-fluid mb-3"
                  />
                  <button
                    className="delete-btn"
                    onClick={() => deleteReservation(res.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReservationList;

