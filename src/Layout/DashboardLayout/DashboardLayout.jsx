
import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../../Components/Dashboard/Aside';

const DashBoardLayOut = () => {
  return (
    <div className='flex'>
        <Aside></Aside>
      <div className='flex-1 p-5 pt-15'>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoardLayOut;