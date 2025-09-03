// ReservationList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import './reservationList.css';

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReservations, setTotalReservations] = useState(0);

  const reservationsPerPage = 6;
  const API_BASE = process.env.REACT_APP_API_BASE_URL; // e.g., http://localhost/reactapp2/reservations/reservation_server/api

  // Fetch reservations from backend
  const fetchReservations = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE}/reservations.php?page=${page}&limit=${reservationsPerPage}`
      );
      setReservations(response.data.reservations || []);
      setTotalReservations(response.data.totalReservations || 0);
    } catch (err) {
      console.error(err);
      setError("Failed to load reservations.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalReservations / reservationsPerPage) || 1;

  const goToPreviousPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Delete reservation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return;

    try {
      const response = await axios.post(`${API_BASE}/deleteReservation.php`, { id });
      if (response.data.status === "success") {
        // Refresh list after deletion
        fetchReservations(currentPage);
      } else {
        setError(response.data.message || "Failed to delete reservation");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to delete reservation");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Reservations</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {isLoading ? (
        <p>Loading reservations...</p>
      ) : reservations.length ? (
        <div className="row">
          {reservations.map((reservation) => (
            <div className="col-md-4" key={reservation.id}>
              <div className="card mb-4">
                <div className="card-body text-center">
                  <h5 className="card-title">{reservation.name}</h5>
                  <p className="card-text">{reservation.location}</p>
                  <p className="card-text">{reservation.date}</p>
                  <p className="card-text">{reservation.time}</p>
                  <img
                    src={reservation.photo || "placeholder.jpeg"}
                    alt={reservation.name}
                    className="img-fluid mb-3"
                  />
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(reservation.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No reservations available</p>
      )}

      {/* Pagination */}
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={goToPreviousPage}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={goToNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default ReservationList;
