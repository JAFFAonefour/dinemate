import React, { useEffect, useState } from 'react';
import { Tabs } from "antd";
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';


const { TabPane } = Tabs;

function Adminscreen() {
  return (
    <div className="admin-container">
      <div className="mt-3 ml-3 mr-3 bs shadow">
        <h2 className='text-center' style={{ fontSize: '30px' }}><b>Admin Panel</b></h2>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Bookings" key="1">
            <Bookings />
          </TabPane>
          <TabPane tab="Restaurants" key="2">
            <Restaurants />
          </TabPane>
          <TabPane tab="Users" key="3">
            <Users />
          </TabPane>
          <TabPane tab="Add Restaurant" key="4">
            <AddRestaurant />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Adminscreen;

export function AddRestaurant() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [imageurl1, setImageUrl1] = useState('');
    const [imageurl2, setImageUrl2] = useState('');
    const [imageurl3, setImageUrl3] = useState('');
    const [limit, setLimit] = useState('');
  
    const addRestaurant = async () => {
      try {
        const response = await axios.post('/api/restaurants/addrestaurant', {
          name,
          category,
          phonenumber,
          description,
          imageurl1,
          imageurl2,
          imageurl3,
          limit
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Restaurant added successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        
        // Clear the input fields
        setName('');
        setCategory('');
        setPhoneNumber('');
        setDescription('');
        setImageUrl1('');
        setImageUrl2('');
        setImageUrl3('');
        setLimit('');

      } catch (error) {
        console.log(error);
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add restaurant!',
        });
      }
    };
  
    return (
      <div className="row">
        <div className="col-md-6">
          <input
            type="text"
            className='form-control'
            placeholder='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className='form-control'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="multi-cuisine">Multi Cuisine</option>
            <option value="cafe">Cafe</option>
            <option value="coolbar">Coolbar</option>
          </select>
          <input
            type="text"
            className='form-control'
            placeholder='phone number'
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="text"
            className='form-control'
            placeholder='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className='form-control'
            placeholder='image url 1'
            value={imageurl1}
            onChange={(e) => setImageUrl1(e.target.value)}
          />
          <input
            type="text"
            className='form-control'
            placeholder='image url 2'
            value={imageurl2}
            onChange={(e) => setImageUrl2(e.target.value)}
          />
          <input
            type="text"
            className='form-control'
            placeholder='image url 3'
            value={imageurl3}
            onChange={(e) => setImageUrl3(e.target.value)}
          />
          <input
            type="text"
            className='form-control'
            placeholder='booking limit'
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div className="text-right">
            <button className='btn btn-primary mt-2' onClick={addRestaurant}>Add Restaurant</button>
          </div>
        </div>
      </div>
    );
  }

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get("/api/bookings/getallbookings");
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    }

    fetchBookings();
  }, []);

  return (
    <div className="row">
      <div className='col-md-10'>
        <h1>BOOKINGS</h1>
        {loading && <Loader />}

        <table className='table table-bordered table-dark'>
          <thead className='bs'>
            <tr>
              <th>Booking ID</th>
              <th>User ID</th>
              <th>Restaurant</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Limit</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length && (bookings.map(booking => {
              return (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.userid}</td>
                  <td>{booking.restaurant}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.status}</td>
                  <td>{booking.limit}</td>
                </tr>
              );
            }))}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get("/api/restaurants/getallrestaurants");
      setRestaurants(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="row">
      <div className='col-md-10'>
        <h1>RESTAURANTS</h1>
        {loading && <Loader />}
        {error && <Error error={error} />}
        <table className='table table-bordered table-dark'>
          <thead className='bs'>
            <tr>
              <th>Restaurant ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Phone Number</th>
              <th>Description</th>
              <th>booking limit</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.length && (restaurants.map(restaurant => {
              return (
                <tr key={restaurant._id}>
                  <td>{restaurant._id}</td>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.category}</td>
                  <td>{restaurant.phonenumber}</td>
                  <td>{restaurant.description}</td>
                  <td>{restaurant.limit}</td>
                </tr>
              );
            }))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users/getallusers');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const setAdminPrivilege = async (userId, isAdmin) => {
    try {
      const response = await axios.post('/api/users/setadmin', {
        userId,
        isAdmin,
      });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Admin privilege updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      });

      fetchUsers();
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update admin privilege!',
      });
    }
  };

  const setManagerPrivilege = async (userId, isManager) => {
    try {
      const response = await axios.post('/api/users/setmanager', {
        userId,
        isManager,
      });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Manager privilege updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      });

      fetchUsers();
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update manager privilege!',
      });
    }
  };

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>USERS</h1>
        {loading && <Loader />}
        {error && <Error error={error} />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th>Is Manager</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                <td>{user.isManager ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => setAdminPrivilege(user._id, !user.isAdmin)}
                  >
                    {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                  </button>
                  <span style={{ margin: '0 5px' }}></span>
                  <button
                    className="btn btn-primary"
                    onClick={() => setManagerPrivilege(user._id, !user.isManager)}
                  >
                    {user.isManager ? 'Remove Manager' : 'Make Manager'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}