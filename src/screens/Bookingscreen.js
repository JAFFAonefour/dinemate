import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';

function Bookingscreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [name, setName] = useState('');
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [phonenumber, setPhoneNumber] = useState('');
  const { restaurantid } = useParams();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/restaurants/getrestaurantbyid', {
          params: {
            restaurantid: restaurantid,
          },
        });
        setRestaurant(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchRestaurant();
  }, [restaurantid]);

  const isFutureTime = (time) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const selectedDate = date || new Date();
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate.getTime() > currentDate.getTime()) {
      return true;
    }

    const currentTime = new Date();
    currentTime.setSeconds(0);

    return time > currentTime;
  };

  async function bookRestaurant() {
    const bookingDetails = {
      restaurant: {
        name: restaurant.name,
        _id: restaurant._id,
      },
      name: name,
      time: time.toLocaleTimeString(),
      date: date.toISOString(),
      guests: guests,
      phonenumber: phonenumber,
    };

    try {
      setLoading(true);
      const response = await axios.post('/api/bookings/bookrestaurant', bookingDetails);
      console.log(response.data);

      setLoading(false);
      Swal.fire('Congratulations', 'Your Table Booked successfully', 'success').then((result) => {
        window.location.href = '/profile';
      });
    } catch (error) {
      console.log('Error occurred while booking:', error);
      setLoading(false);
      Swal.fire('Oops', 'Something Went Wrong', 'error');
    }
  }

  return (
    <div className='m-5'>
      {loading ? (
        <Loader />
      ) : restaurant ? (
        <div>
          <div className='row justify-content-center mt-5'>
            <div className='col-md-8'>
              <h3 className='text-center mb-4'>{restaurant.name}</h3>

              <div className='text-center my-3'>
                {restaurant.imageurls.map((imageUrl, index) => (
                  <img src={imageUrl} alt={`Restaurant ${index + 1}`} key={index} style={{ margin: '10px', display: 'inline-block' }} />
                ))}
              </div>

              <div className='mt-4'>
                <p>
                  <b>Category: </b>
                  {restaurant.category}
                </p>
                <p>
                  <b>Phone Number: </b>
                  {restaurant.phonenumber}
                </p>
                <p>
                  <b>Description: </b>
                  {restaurant.description}
                </p>
              </div>
            </div>
          </div>

          <div className='row justify-content-center mt-5 bs'>
            <div className='col-md-6'>
              <div style={{ textAlign: 'center' }}>
                <h3>Booking details</h3>
                <hr />
                <div className='form-group row'>
                  <label htmlFor='name' className='col-sm-4 col-form-label' style={{ fontSize: '25px', textTransform: 'uppercase', textAlign: 'right' }}>
                    Name:
                  </label>
                  <div className='col-sm-4'>
                    <input type='text' id='name' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                </div>
                <div className='form-group row'>
                  <label htmlFor='name' className='col-sm-4 col-form-label' style={{ fontSize: '25px', textTransform: 'uppercase', textAlign: 'right' }}>
                    Time:
                  </label>
                  <div className='col-sm-4'>
                    <DatePicker
                      id='time'
                      className='form-control'
                      selected={time}
                      onChange={(date) => setTime(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat='h:mm aa'
                      minTime={new Date().setHours(0, 0)}
                      maxTime={new Date().setHours(23, 45)}
                      filterTime={isFutureTime}
                    />
                  </div>
                </div>
                <div className='form-group row'>
                  <label htmlFor='name' className='col-sm-4 col-form-label' style={{ fontSize: '25px', textTransform: 'uppercase', textAlign: 'right' }}>
                    Date:
                  </label>
                  <div className='col-sm-4'>
                    <DatePicker id='date' className='form-control' selected={date} onChange={(date) => setDate(date)} dateFormat='MMMM d, yyyy' minDate={new Date()} />
                  </div>
                </div>
                <div className='form-group row'>
                  <label htmlFor='name' className='col-sm-4 col-form-label' style={{ fontSize: '25px', textTransform: 'uppercase', textAlign: 'right' }}>
                    Guests:
                  </label>
                  <div className='col-sm-4'>
                    <select id='guests' className='form-control' value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                      {Array.from({ length: 15 }, (_, index) => index + 1).map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='form-group row'>
                  <label htmlFor='name' className='col-sm-4 col-form-label' style={{ fontSize: '25px', textTransform: 'uppercase', textAlign: 'right' }}>
                    Phone Number:
                  </label>
                  <div className='col-sm-4'>
                    <input type='text' id='phoneNumber' className='form-control' value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className='text-center'>
                <button className='btn btn-primary' onClick={bookRestaurant}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
