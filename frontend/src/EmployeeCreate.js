import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeCreate = () => {
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(''); // Added gender state
  const [salary, setSalary] = useState(''); // Added salary state
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const empdata = { first_name, last_name, email, gender, salary }; // Include gender and salary

    try {
      const response = await fetch('http://localhost:3001/api/v1/emp/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(empdata),
      });

      if (response.ok) {
        alert('Saved successfully');
        navigate('/employee');
      } else {
        const data = await response.json();
        setError('Failed to create / Email must be unique');
      }
    } catch (error) {
      console.log(error.message);
      setError('All fields must be filled, and Email must be unique');
    }
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: 'left' }}>
              <div className="card-title">
                <h2>Add Employee</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>First Name:</label>
                      <input required value={first_name} onChange={(e) => setFirstName(e.target.value)} className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Last Name:</label>
                      <input required value={last_name} onChange={(e) => setLastName(e.target.value)} className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email Id:</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Gender:</label>
                      <select value={gender} onChange={(e) => setGender(e.target.value)} className="form-control">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Salary:</label>
                      <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="form-control" />
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
              </div>
            </div>
          </form>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCreate;