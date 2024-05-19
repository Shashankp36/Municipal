import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get('/api/auth/profile'); // Update the endpoint to match the backend route
      setUserData(data);
    } catch (error) {
      // Handle errors
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {userData.email}</p>
      <p>Name: {userData.name}</p>
      <p>Phone: {userData.phone}</p> {/* Fixed typo here */}
      <p>Aadhaar Number: {userData.aadhaarNumber}</p>
      <p>Number of Complaints: {userData.complaints ? userData.complaints.length : 0}</p> {/* Added check for complaints */}
    </div>
  );
};

export default Profile;
