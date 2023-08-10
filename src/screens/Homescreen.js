import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Restaurant from '../components/Restaurant';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Homescreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/restaurants/getallrestaurants');
        setRestaurants(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilter = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const nameMatch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === '' || restaurant.category === selectedCategory;
    return nameMatch && categoryMatch;
  });

  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-8'>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Search by name...'
              value={searchTerm}
              onChange={handleSearch}
            />
            <select className='form-control' value={selectedCategory} onChange={handleCategoryFilter}>
              <option value=''>All Categories</option>
              <option value='veg'>Veg</option>
              <option value='non-veg'>Non-Veg</option>
              <option value='multi-cuisine'>Multi Cuisine</option>
              <option value='cafe'>Cafe</option>
              <option value='coolbar'>Coolbar</option>
            </select>
          </div>
        </div>
      </div>

      <div className='row justify-content-center mt-3'>
        {loading ? (
          <Loader />
        ) : filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <div className='col-md-9 mt-2' key={restaurant._id}>
              <Restaurant restaurant={restaurant} />
            </div>
          ))
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default Homescreen;
