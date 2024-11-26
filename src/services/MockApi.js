const mockData = {
    users: [
      { id: 1, name: "Alice", role: "Admin", status: "Active" },
      { id: 2, name: "Bob", role: "User", status: "Inactive" },
    ],
    roles: [
      { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
      { id: 2, name: "User", permissions: ["Read"] },
    ],
  };
  
  export const fetchUsers = () => Promise.resolve(mockData.users);
  
  export const fetchRoles = () => Promise.resolve(mockData.roles);
  
  export const addUser = (user) => {
    mockData.users.push({ id: Date.now(), ...user });
    return Promise.resolve("User added successfully!");
  };
  
  export const updateUser = (id, updatedUser) => {
    const index = mockData.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      mockData.users[index] = { ...mockData.users[index], ...updatedUser };
      return Promise.resolve("User updated successfully!");
    }
    return Promise.reject("User not found!");
  };
  
  export const deleteUser = (id) => {
    const userIndex = mockData.users.findIndex((user) => user.id === Number(id)); // Ensure proper type comparison
    if (userIndex !== -1) {
      mockData.users.splice(userIndex, 1);
      return Promise.resolve("User deleted successfully!");
    }
    return Promise.reject("User not found!");
  };
  
  export const updateRolePermissions = (roleId, permissions) => {
    const roleIndex = mockData.roles.findIndex((role) => role.id === roleId);
    if (roleIndex !== -1) {
      mockData.roles[roleIndex].permissions = permissions;
      return Promise.resolve("Permissions updated successfully!");
    }
    return Promise.reject("Role not found");
  };
  
  // New role management functions
  export const addRole = (role) => {
    const newRole = { id: Date.now(), ...role };
    mockData.roles.push(newRole);
    return Promise.resolve("Role added successfully!");
  };
  
  export const updateRole = (id, updatedRole) => {
    const roleIndex = mockData.roles.findIndex((role) => role.id === id);
    if (roleIndex !== -1) {
      mockData.roles[roleIndex] = { ...mockData.roles[roleIndex], ...updatedRole };
      return Promise.resolve("Role updated successfully!");
    }
    return Promise.reject("Role not found!");
  };
  
  export const deleteRole = (id) => {
    const roleIndex = mockData.roles.findIndex((role) => role.id === id);
    if (roleIndex !== -1) {
      mockData.roles.splice(roleIndex, 1);
      return Promise.resolve("Role deleted successfully!");
    }
    return Promise.reject("Role not found!");
  };
  