import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getproblemsuper, status_update } from '../utils/ApiRequest';
import axios from 'axios';
import './complaint.css';
import SuperadminSidebar from '../Sidebar/SuperadminSidebar';

function Complaint({ handle_view }) {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [problem, setProblem] = useState([]);
  const [currId, setCurrId] = useState(null);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState('');
  const [showEdit, setShowEdit] = useState({});

  const handleViewClick = (image) => {
    handle_view(image);
    navigate('/image');
  };

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const { data } = await axios.post(getproblemsuper);
        setProblem(data.problem);
        setRefresh(true);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    if (localStorage.getItem('super')) {
      fetchProblem();
    } else {
      navigate('/superadmin/dashboards-a/1');
    }
  }, [navigate, refresh]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(status_update, { status, id: currId });

      if (data.success) {
        handleClose(currId);
        setRefresh(!refresh);
        window.location.reload();
      } else {
        console.error('Error updating status:', data.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleClose = (id) => {
    setShowEdit((prevShowEdit) => ({...prevShowEdit, [id]: false }));
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleEditClick = (id) => {
    setCurrId(id);
    handleShow();
    setShowEdit((prevShowEdit) => ({...prevShowEdit, [id]: true }));
  };

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <SuperadminSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <div className="mfs-list-table-container">
        <table className="mfs-list-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Created By</th>
              <th>Complaint Lodged On</th>
              <th>Complaint</th>
              <th>Department</th>
              <th>Location</th>
              <th>Status</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {problem.map((item) => (
              <tr key={item.id}>
                <td>{item.token}</td>
                <td>{item.user.email}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>{item.problem}</td>
                <td>{item.department}</td>
                <td>{item.location}</td>
                <td>{item.status}</td>
                <td>
                  <button onClick={() => handleViewClick(item.Image)}>View</button>
                </td>
                <td>
                  <div className="icons-handle">
                    <button
                      key={item._id}
                      id={item._id}
                      className="btn btn-warning"
                      onClick={() => handleEditClick(item._id)}
                    >
                      Open
                    </button>
                    {showEdit[item._id]? (
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
                            <button type="button" className="btn btn-danger" onClick={() => handleClose(item._id)}>
                              Close
                            </button>
                            <button type="submit" className="btn btn-success">
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Complaint;