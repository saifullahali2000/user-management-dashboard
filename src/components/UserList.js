import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
import "./UserList.css"; // Import the CSS file

const UserList = ({ users, setUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getFirstAndLastName = (fullName) => {
    if (!fullName) return { firstName: "N/A", lastName: "N/A" };
    const [firstName, ...rest] = fullName.split(" ");
    const lastName = rest.join(" ") || "N/A";
    return { firstName, lastName };
  };

  return (
    <div className="user-list-container">
      <h1 className="user-list-title">User List</h1>
      <Link to="/add">
        <button className="add-user-button">Add User</button>
      </Link>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => {
            const { firstName, lastName } = getFirstAndLastName(user.name);
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{user.email}</td>
                <td>{user.department || "N/A"}</td>
                <td>
                  <Link to={`/edit/${user.id}`}>
                    <button className="edit-button">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserList;