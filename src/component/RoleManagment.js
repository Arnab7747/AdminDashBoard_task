import React, { useState, useEffect } from "react";
import { 
  fetchRoles, 
  addRole, 
  updateRole, 
  deleteRole 
} from "../services/MockApi";
import './role.css';
const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [editingRoles, setEditingRoles] = useState({});


  useEffect(() => {
    fetchRoles().then(setRoles);
  }, []);


  const handleRoleChange = (id, field, value) => {
 
    setRoles(prevRoles => 
      prevRoles.map(role => 
        role.id === id 
          ? { ...role, [field]: value }
          : role
      )
    );

    
    setEditingRoles(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };


  const saveRoleChanges = (role) => {

    const updatedRole = { 
      ...role,
      permissions: typeof role.permissions === 'string' 
        ? role.permissions.split(',').map(p => p.trim())
        : role.permissions,
      attributes: typeof role.attributes === 'string'
        ? role.attributes.split(',').map(a => a.trim())
        : role.attributes
    };


    updateRole(role.id, updatedRole)
      .then(() => {
   
        const { [role.id]: removed, ...remainingEditing } = editingRoles;
        setEditingRoles(remainingEditing);
      })
      .catch(error => {
        console.error('Failed to update role:', error);
       
        setRoles(prevRoles => 
          prevRoles.map(r => r.id === role.id ? role : r)
        );
      });
  };

 
  const handleCreateRole = () => {
    const newRole = {
      name: "New Role",
      permissions: ["Read"],
      attributes: []
    };

    addRole(newRole)
      .then(createdRole => {
        setRoles(prevRoles => [...prevRoles, createdRole]);
      })
      .catch(error => {
        console.error('Failed to create role:', error);
      });
  };


  const handleDeleteRole = (roleId) => {
    deleteRole(roleId)
      .then(() => {
        setRoles(prevRoles => 
          prevRoles.filter(role => role.id !== roleId)
        );
      })
      .catch(error => {
        console.error('Failed to delete role:', error);
      });
  };

  return (
    <div className="role-management">
      <h2>Role Management</h2>
      
      <button 
        onClick={handleCreateRole} 
        className="create-role-btn"
      >
        Create New Role
      </button>

      <div className="roles-list">
        {roles.map(role => (
          <div key={role.id} className="role-item">
            <div className="role-details">
              <input
                type="text"
                value={role.name}
                onChange={(e) => handleRoleChange(role.id, 'name', e.target.value)}
                className="role-name-input"
              />
              
              <input
                type="text"
                value={
                  Array.isArray(role.permissions) 
                    ? role.permissions.join(', ') 
                    : role.permissions
                }
                onChange={(e) => handleRoleChange(role.id, 'permissions', e.target.value)}
                placeholder="Permissions (comma-separated)"
                className="role-permissions-input"
              />
              
              <input
                type="text"
                value={
                  Array.isArray(role.attributes) 
                    ? role.attributes.join(', ') 
                    : role.attributes
                }
                onChange={(e) => handleRoleChange(role.id, 'attributes', e.target.value)}
                placeholder="Attributes (comma-separated)"
                className="role-attributes-input"
              />
              
              <div className="role-actions">
                {editingRoles[role.id] && (
                  <button 
                    onClick={() => saveRoleChanges(role)}
                    className="save-btn"
                  >
                    Save
                  </button>
                )}
                <button 
                  onClick={() => handleDeleteRole(role.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleManagement;