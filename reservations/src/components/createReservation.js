import React, { useState } from "react";

function CreateReservation({ addReservation }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !location || !date || !time) {
      setError("Please fill in all fields");
      return;
    }

    addReservation({
      id: Date.now(),
      name,
      location,
      date,
      time,
      photo: photo ? URL.createObjectURL(photo) : "/reservations/public/placeholder.jpg",
    });

    setName("");
    setLocation("");
    setDate("");
    setTime("");
    setPhoto(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {error && <p className="text-danger">{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select value={location} onChange={(e) => setLocation(e.target.value)} required>
        <option value="">Select location</option>
        <option value="Silverleaf Woods">Silverleaf Woods</option>
        <option value="Crystal River Preserve">Crystal River Preserve</option>
        <option value="Golden Meadow Sanctuary">Golden Meadow Sanctuary</option>
        <option value="Whispering Pines Reserve">Whispering Pines Reserve</option>
      </select>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
      <button type="submit" className="green-button">
        Add Reservation
      </button>
    </form>
  );
}

export default CreateReservation;
