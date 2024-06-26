import React from 'react';
import '../assets/style/preloader.css';

function PreLoader() {
  return (
    <div className='fixed top-0 left-0 z-50 w-full h-full bg-[#00000094] flex justify-center'>
      <Loader />
    </div>
  );
}

const Loader = () => {
  return (
    <div className='center'>
      <div className='circle'></div>
      <span className='loadtext'>Loading...</span>
    </div>
  );
};

export default PreLoader;
