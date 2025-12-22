import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Components/Homepage/Navbar';
import Footer from '../../Components/Homepage/Footer';


const HomepageLayout = () => {
  return (
     <div className="min-h-screen flex flex-col">
        <Navbar></Navbar>
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer></Footer>
      </div>
  );
};

export default HomepageLayout;