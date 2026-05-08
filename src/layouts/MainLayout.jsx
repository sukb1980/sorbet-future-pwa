import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from '../components/navigation/TopNav';
import BottomNav from '../components/navigation/BottomNav';
import { useAppContext } from '../context/AppContext';

export const MainLayout = () => {
  return (
    <div className="app-shell">
      <TopNav />
      <main className="main-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};
