import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-grow min-h-0 bg-rose-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
