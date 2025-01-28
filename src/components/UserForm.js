import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UserForm.css"; // Import the CSS file

const UserForm = ({ users, setUsers }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editingUser = id ? users.find((user) => user.id === parseInt(id)) : null;

  const [formData, setFormData] = useState(
    editingUser || { id: "", firstName: "", lastName: "", email: "", department: "" }
  );

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      const updatedUser = {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`,
      };
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? updatedUser : user
        )
      );
    } else {
      const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      const newUser = {
        ...formData,
        id: newId,
        name: `${formData.firstName} ${formData.lastName}`,
      };
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="form-title">{editingUser ? "Edit User" : "Add User"}</h1>
      <div className="form-group">
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="form-button">
        Save
      </button>
    </form>
  );
};

export default UserForm;

