import React from 'react';
import './loader.css';

const Loader = ({ color }) => {
  return (
    <div className='h-full flex items-center justify-center'>
        <span className='loader' style={{borderColor: `${color}`}}></span>
    </div>
  )
}

export default Loader
