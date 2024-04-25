import React, { useState, useEffect } from "react";
import * as client from "../Profile/client";
import "./index.css";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";

const BASE_API = process.env.REACT_APP_BACKEND_URL;

function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<client.User[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<{ [key: string]: string }>(
    {}
  );

  const handleDeleteUser = async (userId: any) => {
    await client.deleteUser({ _id: userId });
    fetchUsers();
  };

  const handleRoleChange = async (userId: any, role: string) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        return { ...user, role: role }; // Update the role in the copied user object
      }
      return user;
    });

    // Update the state with the modified list
    setUsers(updatedUsers);

    const userToUpdate = updatedUsers.find((user) => user._id === userId);
    const response = await client.updateUser(userToUpdate);
    // console.log(response);
    fetchUsers();
    const checkUser = await client.profile();
    if (checkUser._id === userId) {
        navigate("/Home/Community");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await client.findAllUsers();
      setUsers(response.reverse());
      const roles: { [key: string]: string } = {};
      response.forEach((user: { _id: string; role: string }) => {
        roles[user._id] = user.role;
      });
      setSelectedRoles(roles);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Header />
      <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user-item">
            <div className="user-info">
              <Link to={`/Profile/${user?._id}`}>
                <img
                  src={
                    user.profilePicture
                      ? `${BASE_API}/${user.profilePicture}`
                      : "images/default.jpeg"
                  }
                  alt="Profile"
                  className="profile-img"
                />
              </Link>
              <div className="user-details">
                <p className="username">@{user.username}</p>
                <p className="display-name" style={{ color: "grey" }}>
                  {user.displayName}
                </p>
              </div>
            </div>
            <div className="user-actions">
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="delete-btn"
                style={{ marginRight: "20px" }}
              >
                X
              </button>
              <select
                value={selectedRoles[user._id]}
                onChange={(e) =>
                  setSelectedRoles({
                    ...selectedRoles,
                    [user._id]: e.target.value,
                  })
                }
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
              <button
                style={{ marginLeft: "20px" }}
                onClick={(e) =>
                  handleRoleChange(user._id, selectedRoles[user._id])
                }
                className="btn btn-danger"
              >
                Confirm
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserList;
