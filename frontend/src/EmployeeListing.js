import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const EmployeeListing = () => {
  const [empdata, empdatachange] = useState(null);

  const navigate = useNavigate();

  const LoadDetail = (id) => {
   
    navigate(`/employee/view/${id}`)
  };

  const LoadUpdate = (id) => {
    navigate(`/employee/update/${id}`);
  };

  const removeFunction = async (id) => {
    if (window.confirm("Do you want to delete?")) {
      
        axios.delete(`http://localhost:3001/api/v1/emp/employees/${id}`)
        .then(() => {
          empdatachange(empdata.filter(employee => employee._id !== id));
        })
        .catch(error => {
          console.error('There was an error deleting the employee:', error);
        });
  
      //   if (response.ok) {
      //     alert("Deleted successfully");
      //     window.location.reload();
      //   } else {
      //     console.error("Delete request failed:", response.status, response.statusText);
      //   }
      // } catch (error) {
      //   console.error("An error occurred during delete:", error.message);
      // }
    }
  };
  

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/emp/employees")
      .then((res) => res.json())
      .then((res) => empdatachange(res))
      .catch((err) => console.log(err.message));
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <div className="divbtn">
              <Link to="/employee/create" className="btn btn-success">
                Add New (+)
              </Link>
            </div>

            <div className="divbtn">
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
          <table className="table table-bordered">
            <thead style={{ backgroundColor: 'black', color: 'white' }}>
              <tr> 
                <td>Employee First Name</td>
                <td>Employee Last Name</td>
                <td>Email</td>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item) => (
                  <tr key={item._id}>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.email}</td>
                    <td>
                      <a
                        onClick={() => {
                          LoadDetail(item._id);
                        }}
                        className="btn btn-primary"
                      >
                        View
                      </a>
                      <a
                        onClick={() => LoadUpdate(item._id)}
                        className="btn btn-success"
                      >
                        Update
                      </a>
                      <a
                        onClick={() => {
                          removeFunction(item._id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeListing;
