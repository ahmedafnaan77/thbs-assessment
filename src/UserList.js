import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'animate.css';
import './UserList.css'; // Import the CSS file for styling

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api.github.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-list-container">
      <h1 className='title-name animate__animated animate__fadeIn'> GitHub User List</h1>
      <input 
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input animate__animated animate__fadeInUp"
      />
      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li key={user.id} className="user-item animate__animated animate__zoomIn">
            <img src={user.avatar_url} alt={`${user.login}'s avatar`} className="avatar" />
            <p className="username">{user.login}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
