import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  
  const handlesubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Reset error message

    try {
      // Ensure the URL points to the correct backend endpoint
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/signup",
        {
          username,
          email,
          password,
        }
      );

      alert("Registration successful", response.data);
      navigate('/');
    } catch (error) {
      // Error handling
      if (error.response) {
        
        setError(
          "An error occurred during registration / Email and username should be unique"
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form className="signup-con container" onSubmit={handlesubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>
                      User Name <span className="errmsg">*</span>
                    </label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>
                      Email <span className="errmsg">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>
                      Password <span className="errmsg">*</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>
                      Confirm Password <span className="errmsg">*</span>
                    </label>
                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="password"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              {error && <p className="text-danger">{error}</p>}
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Signup
              </button>
              {/* Use Link for navigation */}
              <Link to="/" className="btn btn-danger">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
