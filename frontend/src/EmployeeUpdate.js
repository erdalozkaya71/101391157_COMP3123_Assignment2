import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables for form fields
  const [empdata, setEmpdata] = useState(null);
  const [first_name, setName] = useState('');
  const [last_name, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    // Fetch employee data by ID if editing an existing employee
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/emp/employees/${id}`);
        console.log('API Response:', response.data);

        if (response.status === 200) {
          setEmpdata(response.data);
          // Update form fields with existing employee data
          setName(response.data.first_name || '');
          setLname(response.data.last_name || '');
          setEmail(response.data.email || '');
          setGender(response.data.gender || '');
          setSalary(response.data.salary || '');
        } else {
          console.error('Failed to fetch employee details');
        }
      } catch (error) {
        console.error('An error occurred during fetch:', error.message);
      }
    };

    if (id) {
      fetchEmployeeData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { first_name, last_name, email, gender, salary };

    // Use PUT method if editing an existing employee
    try {
      const response = await axios.put(`http://localhost:3001/api/v1/emp/employees/${id}`, updatedData);

      if (response.status === 200) {
        alert('Saved successfully');
        navigate('/employee'); // Redirect to the employee listing page after saving
      } else {
        console.error('Failed to update employee');
      }
    } catch (error) {
      console.error('An error occurred during update:', error.message);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: 'left' }}>
              <div className="card-title">
                <h2>Edit Employee</h2>
              </div>
              <div className="card-body">
                {empdata && (
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>First Name:</label>
                        <input
                          required
                          value={first_name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Last Name:</label>
                        <input
                          required
                          value={last_name}
                          onChange={(e) => setLname(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Email Id:</label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Gender:</label>
                        <input
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Salary:</label>
                        <input
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <button className="btn btn-success" type="submit">
                          Save
                        </button>
                        <Link to="/employee" className="btn btn-danger">
                          Cancel
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeUpdate;