import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ManageReservation = () => {
  const { resID } = useParams();
  const [reservation, setReservation] = useState(null);
  const [status, setStatus] = useState("available");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  // Fetch reservation details
  const fetchReservation = async () => {
    try {
      const response = await axios.get(
        `http://localhost/reactapp2/reservations/reservation_server/api/manageReservations.php/${resID}`
      );

      const reservationData = response.data?.data;
      if (!reservationData) throw new Error("Invalid response format");

      setReservation(reservationData);
      setStatus(reservationData.booked === 1 ? "booked" : "available");
    } catch (error) {
      console.error("Failed to fetch reservation:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update reservation status
  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post(
        "http://localhost/reactapp2/reservations/reservation_server/api/updateReservation.php",
        {
          id: resID,
          status: status,
        }
      );

      // Refresh reservation data after update
      fetchReservation();
      navigate("/");
    } catch (error) {
      console.error("Failed to update reservation:", error);
      alert("Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchReservation();
  }, []); // run once on mount

  if (loading) return <div>Loading reservation...</div>;
  if (!reservation) return <div>Reservation not found.</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-5 text-center">Manage Reservation</h2>
      <div className="card mb-4 shadow-lg border-0 p-4">
        <div className="card-body text-center">
          <h5 className="card-title">{reservation.name}</h5>
          <p className="card-text">
            <strong>Location:</strong> {reservation.location}
          </p>
          <p className="card-text">
            <strong>Date:</strong> {reservation.date}
          </p>
          <p className="card-text">
            <strong>Time Slot:</strong> {reservation.time}
          </p>
          <p className="card-text">
            <strong>Status: </strong>
            <select
              className="form-select d-inline-block w-auto"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
            </select>
          </p>
          <button
            className="btn btn-light text-light"
            style={{ backgroundColor: "#2E8B57", color: "white" }}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Updating..." : "Update Reservation"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageReservation;
