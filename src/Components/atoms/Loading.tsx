import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center mt-10">
      <div>
        <TailSpin color="rgb(6 182 212)" radius="2" />
      </div>
    </div>
  );
};

export default LoadingSpinner;