import React, { useState } from "react";
import axios from "axios";

function CreateReservation({ onAdd }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !location || !date || !time) {
      setError("All fields are required.");
      return;
    }

    const formData = { name, location, date, time };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/createReservation.php`,
        formData,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response.data.status === "success") {
        setSuccess("Reservation added successfully!");

        
        setName("");
        setLocation("");
        setDate("");
        setTime("");

     
        if (onAdd) {
          onAdd({
            id: response.data.reservationId,
            name,
            location,
            date,
            time,
          });
        }
      } else {
        setError(response.data.message || "Failed to add reservation");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to add reservation");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add New Reservation</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location:</label>
          <select
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option value="">-- Select a Location --</option>
            <option value="Silverleaf Woods">Silverleaf Woods</option>
            <option value="Crystal River Preserve">Crystal River Preserve</option>
            <option value="Golden Meadow Sanctuary">Golden Meadow Sanctuary</option>
            <option value="Whispering Pines Reserve">Whispering Pines Reserve</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date:</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time:</label>
          <input
            type="time"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Add Reservation
        </button>
      </form>
    </div>
  );
}

export default CreateReservation;
