import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

function Registerscreen() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const register = async () => {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
        isAdmin: false,
      };

      try {
        setLoading(true);
        const response = await axios.post('/api/users/register', user);
        setLoading(false);
        setSuccess(true);

        setname('');
        setemail('');
        setpassword('');
        setcpassword('');

        console.log(response.data); // Handle the response as needed
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error.response.data.message);
      }
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div>
      {loading && <Loader />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message={error} />}
          {success && <Success message="Registration Success" />}

          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />

            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>

            <div className="mt-3">
              Already have an account?{' '}
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
