import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<UserList users={users} setUsers={setUsers} />} />
        <Route path="/add" element={<UserForm users={users} setUsers={setUsers} />} />
        <Route path="/edit/:id" element={<UserForm users={users} setUsers={setUsers} />} />
      </Routes>
    </div>
  );
};

export default App;





