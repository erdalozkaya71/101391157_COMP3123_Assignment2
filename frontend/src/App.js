import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeListing from "./EmployeeListing";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeUpdate from "./EmployeeUpdate";
import EmployeeView from "./EmployeeView";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

function App() {

  // State to store fetched employee data
  const [employees, setEmployees] = useState([]);

  // State to store fetched user data
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   // Fetch employee data
  //   fetch("http://localhost:3001/api/db/employee")
  //     .then((response) => response.json())
  //     .then((data) => setEmployees(data));

  //   // Fetch user data
  //   fetch("http://localhost:3001/api/userdb/users")
  //     .then((response) => response.json())
  //     .then((data) => setUsers(data));
  // }, []);


  return (
    <div className="App">
      <h2 className="title-app">Employee Management App</h2>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={Home}></Route> */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employee" element={<EmployeeListing />}></Route>
          <Route path="/employee/create" element={<EmployeeCreate />}></Route>
          <Route path="/employee/view/:id" element={<EmployeeView />}></Route>
          <Route path="/employee/update/:id" element={<EmployeeUpdate />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
