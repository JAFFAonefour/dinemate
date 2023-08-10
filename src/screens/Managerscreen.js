import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function Managerscreen() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [imageurl1, setImageUrl1] = useState('');
    const [imageurl2, setImageUrl2] = useState('');
    const [imageurl3, setImageUrl3] = useState('');

    const userId = localStorage.getItem('userId');

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
                managerid: userId, // Assign the current userid to the managerid field
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
                <div className="text-right">
                    <button className='btn btn-primary mt-2' onClick={addRestaurant}>Add Restaurant</button>
                </div>
            </div>
        </div>
    );
}

export default Managerscreen;
