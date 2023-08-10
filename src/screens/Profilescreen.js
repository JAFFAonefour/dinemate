import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, [user]);

  return (
    <div className="ml-3 mt-3">
      <Tabs>
        <TabPane tab="Profile" key="1">
          <h1>MY PROFILE</h1>
          <br />
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>Is Admin: {user.isAdmin ? 'YES' : 'NO'}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings user={user} />
        </TabPane>
      </Tabs>
    </div>
  );
}

function MyBookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const response = await axios.post('/api/bookings/getbookingsbyuserid', {
            userid: user._id,
          });
          const bookingsData = response.data;
          setBookings(bookingsData);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setError(error);
        }
      }
    };

    fetchData();
  }, [user]);

  async function cancelBooking(bookingid, restaurantid) {
    try {
      const result = await axios.post("/api/bookings/cancelbooking", {
        bookingid,
        restaurantid
      });
      console.log(result.data); // Optional: Log the response

      // Remove the canceled booking from the state
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingid)
      );
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <div className="row">
          <div className="col-md-6">
            {bookings.map((booking) => (
              <div className="bs" key={booking._id}>
                <h3>{booking.restaurant}</h3>
                <p>
                  <b>Booking ID: </b>
                  {booking._id}
                </p>
                <p>
                  <b>Date: </b>
                  {booking.date}
                </p>
                <p>
                  <b>Time: </b>
                  {booking.time}
                </p>
                <p>
                  <b>Guests: </b>
                  {booking.guests}
                </p>
                <p>
                  <b>Phone Number: </b>
                  {booking.phonenumber}
                </p>
                <p>
                  <b>Status: </b>
                  {booking.status === 'booked'
                    ? 'CONFIRMED'
                    : booking.status === 'cancelled'
                    ? 'CANCELLED'
                    : 'UNKNOWN'}
                </p>

                <div className="text-right">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      cancelBooking(booking._id, booking.restaurantid);
                    }}
                  >
                    CANCEL BOOKING
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profilescreen;
