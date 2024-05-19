import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getproblem } from '../utils/ApiRequest';
import './Home.css';
import Sidebar from '../Sidebar/sidebar';

const Home = () => {
  const [userProblem, setUserProblem] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblem = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.post(getproblem, {
        userId: user._id,
      });
      setUserProblem(data.problem);
    };

    if (localStorage.getItem("user")) {
      fetchProblem();
    } else {
      navigate("/login");
    }
  }, [refresh]);

  const userData = {
    name: 'User',
    profilePicture: 'data:image/png;base64,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',
  };
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
    <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <div className="content">
        <div className="welcome">
          <div className="user-info">
            <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
            <div>
              <h1>Hi {userData.name}!</h1>
            </div>
          </div>
        

          <div className="user-problems">
            {userProblem.map((problem, index) => (
              <div key={index} className="problem-item">
              </div>
            ))}
          </div>
          <div className="buttons">
            <button className="custom-button" onClick={() => navigate("/user/new")}>
              Add Grievance
            </button>
            <button className="custom-button" onClick={() => navigate("/user/history")}>
              History
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;