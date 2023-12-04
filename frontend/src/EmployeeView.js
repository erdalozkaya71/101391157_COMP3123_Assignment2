import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EmployeeView = () => {
  const [empdata, setEmpdata] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/emp/employees/${id}`);
        console.log('API Response:', response.data);

        if (response.status === 200) {
          setEmpdata(response.data);
        } else {
          console.error('Failed to fetch employee details');
        }
      } catch (error) {
        console.error('An error occurred during fetch:', error.message);
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <div className="view-box">
      <div className="emp-view">
        <div className="card" style={{ textAlign: 'left' }}>
          <div className="card-title">
            <h3>View Employee Details</h3>
          </div>
          <div className="card-body">
            {empdata && (
              <div key={empdata._id}>
                <h5>Employee First Name: {empdata.first_name} </h5>
                <h5>Employee Last Name: {empdata.last_name} </h5>
                <h5>Employee Email: {empdata.email} </h5>
                <h5>Employee Gender: {empdata.gender} </h5>
                <h5>Employee Salary: {empdata.salary} </h5>
                <Link className="btn btn-primary" to="/employee">
                  Back
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;