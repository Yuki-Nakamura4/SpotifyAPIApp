import React from 'react';
import { Circles } from 'react-loader-spinner';

const LoadingSpinner: React.FC = () => {
  return (
    <>
    <div className="flex justify-center mt-10">
      <div>
        <Circles color="rgb(6 182 212)" />
        {/*<Circles color="#1e3a8a" />*/}
      </div>
    </div>
    <div className="mt-2 text-slate-700">Now Loading</div>
    </>
  );
};

export default LoadingSpinner;