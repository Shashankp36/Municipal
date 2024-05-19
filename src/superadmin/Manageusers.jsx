
import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getuser,delete_user} from '../utils/ApiRequest.js';
import axios from 'axios';
import SuperadminSidebar from '../Sidebar/SuperadminSidebar';

function Manageusers() {
  const navigate=useNavigate();
  const [refresh,setRefresh]=useState(false);
  const[adminuser,setadminuser]=useState([]);
   
  useEffect(() => {
    const fetch_problem=async()=>{
    const {data} = await axios.post(getuser);
    console.log(data.admin);
    const modeified_data=data.admin;
    setadminuser(modeified_data);
    }
    if (localStorage.getItem("super") ){
      fetch_problem();
    }
    else {
      navigate("/superadminlogin");
    } 
  }, [refresh]);

  useEffect(() => {
    // handlemiddleware;
    const authuser = async () => {
      if (localStorage.getItem("super") 
    ){
        const user = JSON.parse(localStorage.getItem("super"));

      } 
      else {
        navigate("/superadminlogin");
      }
    };

    authuser();
  }, [navigate]);

  const deleteuser = async (id) => {
    try {
      const { data } = await axios.post(delete_user, { id: id });
      if (data.success) {
        window.alert("user is deleted");
        window.location.reload();
      } else {
        // Handle failure
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <>
    <SuperadminSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
    <div className="row row-cols-md-3 row-cols-md-3 g-2">
  {adminuser.map((item, index) => (
    <div className="col " key={index}>
      <div className="admin-card" style={{ width: "18rem" }}>
        <img
          src="https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=1024x1024&w=is&k=20&c=r--oPfS14d-ybe3adW-c_oy6q1tCz1c16SN8h5EdoKk="
          className="card-img-top"
          alt="..."
        />
        <div className="admin-card-body">
          <h1 className="admin-card-title">{item.email}</h1>
          <p className="admin-card-text">User Name: {item.name}</p>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={() => deleteuser(item._id)}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
    </>

  )
}

export default Manageusers;