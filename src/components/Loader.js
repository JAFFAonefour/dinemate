import React, { useState } from 'react';
import BarLoader from "react-spinners/BarLoader";

function Loader() {
  const [loading, setLoading] = useState(true);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75vh',
      }}
    >
      <div className="sweet-loading">
        <BarLoader color={'#000'} loading={loading} css='' size={80} />
      </div>
    </div>
  );
}

export default Loader;
