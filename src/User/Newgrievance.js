// import React, { useState } from 'react';
// import { raiseproblem, add_image } from '../utils/ApiRequest';
// import { toast } from 'react-toastify';
// import { Form } from 'react-bootstrap';
// import './new.css';
// import { useNavigate } from 'react-router-dom'; 
// import axios from 'axios';
// import Sidebar from '../Sidebar/sidebar';

// function Newgrievance() {
//   const navigate = useNavigate();
//   const [image, setImage] = useState(null);
//   const [department, setDepartment] = useState('');
//   const [subdepartment, setSubdepartment] = useState('');
//   const [problem, setProblem] = useState('');
//   const [location, setlocation] = useState('');

//   const departments = {
//     PWD: ['Road Management', 'Bridge Maintenance', 'Street Lighting', 'Drainage and Sewerage'],
//     HSD: ['Waste Management', 'Sanitation Services', 'Public Health Inspections', 'Vector Control'],
//     TD: ['Public Transit', 'Traffic Management', 'Parking Services', 'Transportation Planning'],
//     EPD: ['Air Quality Management', 'Water Quality Management', 'Hazardous Waste Management', 'Environmental Compliance'],
//     SSD: ['Housing Assistance', 'Welfare Programs', 'Child and Family Services', 'Senior Services'],
//     PSD: ['Police Services', 'Fire and Rescue Services', 'Emergency Management', 'Animal Control'],
//   };

//   const handleDepartmentChange = (e) => {
//     setDepartment(e.target.value);
//     setSubdepartment(''); // Reset sub department when department changes
//   };

//   function generateCustomToken(prefix = 'ABC', length = 8) {
//     const digits = '0123456789';
//     let token = prefix;
//     for (let i = token.length; i < length; i++) {
//       token += digits.charAt(Math.floor(Math.random() * digits.length));
//     }
//     return token;
//   }

//   const toastOptions = {
//     position: 'bottom-right',
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: false,
//     draggable: true,
//     progress: undefined,
//     theme: 'dark',
//   };

//   const handle_submit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('image', image);
  
//     try {
//       await axios.post(add_image, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
  
//       const uniqueToken = generateCustomToken();
//       const user = JSON.parse(localStorage.getItem('user'));
  
//       const { data } = await axios.post(raiseproblem, {
//         email: user.email,
//         subdepartment,
//         problem,
//         department,
//         location,
//         token: uniqueToken,
//       });
  
//       if (data.success) {
//         window.alert(`You have raised your problem and your token is ${uniqueToken}`);
//         navigate('/user/history'); // Redirect to history page after successful submission
//         toast.success(data.message, toastOptions);
//       } else {
//         toast.error(data.message, toastOptions);
//       }
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.message) {
//         toast.error(error.response.data.message, toastOptions);
//       } else {
//         toast.error("Error raising the problem. Please try again later.", toastOptions);
//       }
//     } 
//   };
  

//   const reset = (e) => {
//     e.preventDefault();
//     setDepartment('');
//     setSubdepartment('');
//     setlocation('');
//     setProblem('');
//     setImage(null);
//   };

//   const onInputChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const [showSidebar, setShowSidebar] = useState(false);

//   const toggleSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   return (
//     <>
//       <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
//       <div className='container-new justify-content-center'>
//         <div className='form-box'>
//           <form className="form-new" method="POST">
//             <label className="h4" htmlFor="department">
//               Department
//             </label>
//             <select
//               className="mb-3 w-100"
//               name="department"
//               id="department"
//               value={department}
//               onChange={handleDepartmentChange}
//             >
//               <option value="">Choose...</option>
//               <option value="PWD">Public Works Department</option>
//               <option value="HSD">Health and Sanitation Department</option>
//               <option value="TD">Transportation Department</option>
//               <option value="EPD">Environmental Protection Department</option>
//               <option value="SSD">Social Services Department</option>
//               <option value="PSD">Public Safety Department</option>
//             </select>
//             <label className="h4" htmlFor="subdepartment">
//               Sub Department
//             </label>
//             <select
//               className="mb-3 w-100"
//               name="subdepartment"
//               id="subdepartment"
//               value={subdepartment}
//               onChange={(e) => setSubdepartment(e.target.value)}
//             >
//               <option value="">Choose...</option>
//               {departments[department] &&
//                 departments[department].map((subDept) => (
//                   <option key={subDept} value={subDept}>
//                     {subDept}
//                   </option>
//                 ))}
//             </select>
//             <br />
//             <label className="h4" htmlFor="problem">
//               Problem
//             </label>
//             <input
//               type="textarea"
//               className="form-control"
//               id="problem"
//               placeholder="Problem Description"
//               value={problem}
//               onChange={(e) => setProblem(e.target.value)}
//             />
//             <br />
//             <Form.Group controlId="formFile" className="">
//               <Form.Label className='h4'>Attach File</Form.Label>
//               <Form.Control type="file" accept="image/*" onChange={onInputChange} />
//             </Form.Group>
//             <br />
//             <label className="h4" htmlFor="location">
//               Location
//             </label>
//             <input
//               type="textarea"
//               className="form-control"
//               id="location"
//               placeholder="Location..."
//               value={location}
//               onChange={(e) => setlocation(e.target.value)}
//             />
//             <button type="submit" className="btn btn-warning" onClick={handle_submit}>
//               Submit
//             </button>
//             <button className="btn btn-success m-3" onClick={reset}>
//               Reset
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Newgrievance;
import React, { useState } from 'react';
// Import the required API endpoints
import { raiseproblem, add_image } from '../utils/ApiRequest';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import './new.css';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Sidebar from '../Sidebar/sidebar';

function Newgrievance() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [department, setDepartment] = useState('');
  const [subdepartment, setSubdepartment] = useState('');
  const [problem, setProblem] = useState('');
  const [location, setlocation] = useState('');

  const departments = {
    PWD: ['Road Management', 'Bridge Maintenance', 'Street Lighting', 'Drainage and Sewerage'],
    HSD: ['Waste Management', 'Sanitation Services', 'Public Health Inspections', 'Vector Control'],
    TD: ['Public Transit', 'Traffic Management', 'Parking Services', 'Transportation Planning'],
    EPD: ['Air Quality Management', 'Water Quality Management', 'Hazardous Waste Management', 'Environmental Compliance'],
    SSD: ['Housing Assistance', 'Welfare Programs', 'Child and Family Services', 'Senior Services'],
    PSD: ['Police Services', 'Fire and Rescue Services', 'Emergency Management', 'Animal Control'],
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setSubdepartment(''); // Reset sub department when department changes
  };

  function generateCustomToken(prefix = 'ABC', length = 8) {
    const digits = '0123456789';
    let token = prefix;
    for (let i = token.length; i < length; i++) {
      token += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return token;
  }

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  };

  const handle_submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
  
    try {
      // Make a POST request to upload the image
      const imageResponse = await axios.post(add_image, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // If image upload is successful, proceed to raise the problem
      const uniqueToken = generateCustomToken();
      const user = JSON.parse(localStorage.getItem('user'));
  
      const { data } = await axios.post(raiseproblem, {
        email: user.email,
        subdepartment,
        problem,
        department,
        location,
        token: uniqueToken,
        imageUrl: imageResponse.data.imageUrl // Pass the image URL returned by the backend
      });
  
      if (data.success) {
        window.alert(`You have raised your problem and your token is ${uniqueToken}`);
        navigate('/user/history'); // Redirect to history page after successful submission
        toast.success(data.message, toastOptions);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, toastOptions);
      } else {
        toast.error("Error raising the problem. Please try again later.", toastOptions);
      }
    } 
  };
  

  const reset = (e) => {
    e.preventDefault();
    setDepartment('');
    setSubdepartment('');
    setlocation('');
    setProblem('');
    setImage(null);
  };

  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <div className='container-new justify-content-center'>
        <div className='form-box'>
          <form className="form-new" method="POST">
            <label className="h4" htmlFor="department">
              Department
            </label>
            <select
              className="mb-3 w-100"
              name="department"
              id="department"
              value={department}
              onChange={handleDepartmentChange}
            >
              <option value="">Choose...</option>
              <option value="PWD">Public Works Department</option>
              <option value="HSD">Health and Sanitation Department</option>
              <option value="TD">Transportation Department</option>
              <option value="EPD">Environmental Protection Department</option>
              <option value="SSD">Social Services Department</option>
              <option value="PSD">Public Safety Department</option>
            </select>
            <label className="h4" htmlFor="subdepartment">
              Sub Department
            </label>
            <select
              className="mb-3 w-100"
              name="subdepartment"
              id="subdepartment"
              value={subdepartment}
              onChange={(e) => setSubdepartment(e.target.value)}
            >
              <option value="">Choose...</option>
              {departments[department] &&
                departments[department].map((subDept) => (
                  <option key={subDept} value={subDept}>
                    {subDept}
                  </option>
                ))}
            </select>
            <br />
            <label className="h4" htmlFor="problem">
              Problem
            </label>
            <input
              type="textarea"
              className="form-control"
              id="problem"
              placeholder="Problem Description"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            />
            <br />
            <Form.Group controlId="formFile" className="">
              <Form.Label className='h4'>Attach File</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={onInputChange} />
            </Form.Group>
            <br />
            <label className="h4" htmlFor="location">
              Location
            </label>
            <input
              type="textarea"
              className="form-control"
              id="location"
              placeholder="Location..."
              value={location}
              onChange={(e) => setlocation(e.target.value)}
            />
            <button type="submit" className="btn btn-warning" onClick={handle_submit}>
              Submit
            </button>
            <button className="btn btn-success m-3" onClick={reset}>
              Reset
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Newgrievance;

