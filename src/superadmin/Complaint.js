import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getproblemsuper, status_update } from '../utils/ApiRequest';
import axios from 'axios';
import './complaint.css';
import Adminsidebar from '../Sidebar/adminsidebar.jsx';
import moment from 'moment'; // Import moment for date formatting

function DeptComplaint({ handle_view }) {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [problem, setProblem] = useState([]);
  const [currId, setCurrId] = useState(null);
  const [Show, setShow] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const adminDepartment = JSON.parse(localStorage.getItem("admin")).department;
        const { data } = await axios.post(getproblemsuper, { department: adminDepartment });
        const filteredComplaints = data.problem.filter((complaint) => complaint.department === adminDepartment);
        setProblem(filteredComplaints);
        setRefresh(true);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };
  
    if (localStorage.getItem('admin')) {
      fetchProblems();
    } else {
      navigate('/login');
    }
  }, [refresh, navigate]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(status_update, { status, id: currId });

      if (data.success) {
        await handleClose();
        await setRefresh(!refresh);
        window.location.reload();
      } else {
        console.error('Error updating status:', data.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleEditClick = (id) => {
    handleShow();
    setCurrId(id);
  };

  const handleViewClick = (image) => {
    handle_view(image);
    navigate('/image');
  };

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Adminsidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <div className="mfs-list-table-container">
        <table className="mfs-list-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Complaint Lodged By</th>
              <th>Date</th>
              <th>Complaint</th>
              <th>Location</th>
              <th>Status</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {problem.map((item) => (
              <tr key={item._id}>
                <td>{item.token}</td>
                <td>{item.user.email}</td>
                <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                <td>{item.problem}</td>
                <td>{item.location}</td>
                <td>{item.status}</td>
                <td>
                  <button onClick={() => handleViewClick(item.Image)}>View</button>
                </td>
                <td>
                  <div className="icons-handle">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditClick(item._id)}
                    >
                      Open
                    </button>
                    {Show && currId === item._id && (
                      <div className="openform">
                        <form onSubmit={handleEditSubmit}>
                          <label htmlFor="">Remarks</label>
                          <input
                            type="text"
                            name="status"
                            placeholder="Write it here.."
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          />
                          <div className="btns">
                            <button type="button" className="btn btn-danger" onClick={handleClose}>
                              Close
                            </button>
                            <button type="submit" className="btn btn-success">
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DeptComplaint;