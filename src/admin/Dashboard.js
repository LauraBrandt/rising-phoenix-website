import React from 'react';
import { logout } from '../utils/AuthService';

const Dashboard = () => {
  document.title = "Dashboard | Rising Phoenix CMS";

  return (
    <div>
      This is the dashboard.
      <button onClick={() => logout()}>Log out </button>
    </div>
  );
}
  
export default Dashboard;