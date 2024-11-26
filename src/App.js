import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsersManagment from "./component/UsersManagment";
import RoleManagment from "./component/RoleManagment";
import PermissionManagment from "./component/PermissionManagment";
import LandingPage from "./component/LandingPage";
import './App.css';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <button className="menu-toggle" onClick={toggleSidebar}>
          {sidebarOpen ? "Close Menu" : "Open Menu"}
        </button>
        <nav className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setSidebarOpen(false)}>Dashboard</Link>
          <Link to="/users" onClick={() => setSidebarOpen(false)}>User Management</Link>
          <Link to="/roles" onClick={() => setSidebarOpen(false)}>Role Management</Link>
          <Link to="/permissions" onClick={() => setSidebarOpen(false)}>Permission Management</Link>
        </nav>
        <main className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/users" element={<UsersManagment />} />
            <Route path="/roles" element={<RoleManagment />} />
            <Route path="/permissions" element={<PermissionManagment />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
