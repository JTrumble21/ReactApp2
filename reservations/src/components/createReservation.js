import React, { useState } from "react";

function CreateReservation({ onAdd }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("time", time);
    if (photo) formData.append("photo", photo);

    try {
      // For now, just add the new reservation locally
      const newReservation = {
        id: Date.now(),
        name,
        location,
        date,
        time,
        photo: photo ? URL.createObjectURL(photo) : "./placeholder.jpg",
      };
      onAdd(newReservation);

      setName("");
      setLocation("");
      setDate("");
      setTime("");
      setPhoto(null);
    } catch (err) {
      console.error(err);
      setError("Error submitting reservation.");
    }
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

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      >
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

