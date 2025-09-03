import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navigation';
import CreateReservation from './components/createReservation';
import ReservationList from './components/reservationList';
import './components/reservationList.css';

const hardcodedReservations = [
  {
    id: 1,
    name: "Jason North",
    location: "Silverleaf Woods",
    date: "2025-09-05",
    time: "10:00",
    photo: "placeholder.jpeg"
  },
  {
    id: 2,
    name: "John Smith",
    location: "Crystal River Preserve",
    date: "2025-09-06",
    time: "12:00",
    photo: "placeholder.jpeg"
  },
  {
    id: 3,
    name: "Jack White",
    location: "Golden Meadow Sanctuary",
    date: "2025-09-07",
    time: "14:00",
    photo: "placeholder.jpeg"
  },
  {
    id: 4,
    name: "Jane Doe",
    location: "Whispering Pines Reserve",
    date: "2025-09-08",
    time: "16:00",
    photo: "placeholder.jpeg"
  }
];

function App() {
  const [reservations, setReservations] = useState(hardcodedReservations);

  // Delete reservation function
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return;
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mt-5">
                <h1 className="mb-4">Welcome to Canada Parks Reservations</h1>
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
                            onClick={() => handleDelete(res.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
          <Route path="/create-reservation" element={<CreateReservation />} />
          <Route path="/reservations" element={<ReservationList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
