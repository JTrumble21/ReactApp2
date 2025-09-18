import React from "react";
import "./reservationList.css"; 

function ReservationList({ reservations, onDelete }) {
  return (
    <div className="reservation-container">
      {reservations.map((res) => (
        <div className="card" key={res.id}>
          <img
            src={res.photo || "./placeholder.jpg"} 
            alt={res.name}
          />
          <div className="card-body">
            <h5 className="card-title">{res.name}</h5>
            <p className="card-text">Location: {res.location}</p>
            <p className="card-text">Date: {res.date}</p>
            <p className="card-text">Time: {res.time}</p>
            <button className="delete-btn" onClick={() => onDelete(res.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReservationList;

