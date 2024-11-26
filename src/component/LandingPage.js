import React from "react";
import { Link } from "react-router-dom";
import './landing.css';

const LandingPage = () => {
  const usersCount = 120; // Replace with dynamic data from backend
  const rolesCount = 15; // Replace with dynamic data from backend
  const permissionsCount = 45; // Replace with dynamic data from backend

  const recentUpdates = [
    { id: 1, type: "User", message: "John Doe added to Admin group", timestamp: "2024-11-25 10:45 AM" },
    { id: 2, type: "Role", message: "Editor role permissions updated", timestamp: "2024-11-25 9:15 AM" },
    { id: 3, type: "Permission", message: "New 'Delete Post' permission created", timestamp: "2024-11-24 3:30 PM" },
  ];

  return (
    <div className="landing-page">
      <h1>Admin Dashboard</h1>
      <div className="overview-cards">
        <div className="card">
          <h2>Users</h2>
          <p>{usersCount} Users</p>
          <Link to="/users">Manage Users</Link>
        </div>
        <div className="card">
          <h2>Roles</h2>
          <p>{rolesCount} Roles</p>
          <Link to="/roles">Manage Roles</Link>
        </div>
        <div className="card">
          <h2>Permissions</h2>
          <p>{permissionsCount} Permissions</p>
          <Link to="/permissions">Manage Permissions</Link>
        </div>
      </div>
      <div className="recent-updates">
        <h2>Recent Updates</h2>
        <ul>
          {recentUpdates.map((update) => (
            <li key={update.id}>
              <strong>{update.type}</strong>: {update.message} <em>({update.timestamp})</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
