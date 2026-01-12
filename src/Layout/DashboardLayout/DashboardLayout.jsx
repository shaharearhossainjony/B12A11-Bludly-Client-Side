
// import React from 'react';
// import { Outlet } from 'react-router';
// import Aside from '../../Components/Dashboard/Aside';

// const DashBoardLayOut = () => {
//   return (
//     <div className='flex'>
//         <Aside></Aside>
//       <div className='flex-1 p-5 pt-15'>
//         <Outlet></Outlet>
//       </div>
//     </div>
//   );
// };

// export default DashBoardLayOut;



import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../../Components/Dashboard/Aside';

const DashBoardLayOut = () => {
  return (
    <div className='flex min-h-screen bg-base-100 dark:bg-zinc-950 transition-colors duration-300'>
      {/* Sidebar Component */}
      <Aside />

      {/* Main Content Area:
          1. flex-1: Takes up remaining horizontal space.
          2. w-full: Ensures it doesn't shrink on smaller screens.
          3. mt-[4.25rem] lg:mt-0: Matches the height of your mobile navbar (72px/4.25rem) 
             defined in the Aside component, then removes it on desktop.
      */}
      <main className='flex-1 w-full mt-[4.25rem] lg:mt-0 transition-all duration-300 overflow-x-hidden'>
        <div className='p-4 md:p-6 lg:p-10'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashBoardLayOut;