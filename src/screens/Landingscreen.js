import React from 'react';
import { Link } from 'react-router-dom';

function Landingscreen() {
  return (
    <div className='row landing'>
      <div className='col-md-12 text-center'>
        <h5 style={{color: 'white' , fontSize: "170px" , paddingTop: '50px'}}> "Dine Mate"</h5>
        <h5 style={{color: 'white' , padding: '30px'}}>connecting you to your next favorite dining experience</h5>
        <Link to='/home'>
          <button className='landingbtn' >Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
