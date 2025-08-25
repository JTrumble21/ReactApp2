import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navigation';
import CreateReservation from './components/CreateReservation';
// import Post from './components/Reservation';
// import PostList from './components/ReservationList';
 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={"/create-reservation"} element={<CreateReservation/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
 
export default App;