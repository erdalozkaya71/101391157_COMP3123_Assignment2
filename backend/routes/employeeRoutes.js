const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../models/employee');
//const { mockUsers, mockEmployees } = require('../models/mockData');



// Define endpoint for getting all employees
router.get('/employees', async (req, res) => {
  

  try {
    // Find all employees in the database
    const employees = await Employee.find();

    // Return the employees as a response with status 200
    res.status(200).json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

 
});

// POST endpoint to create a new employee
router.post('/employees', async (req, res) => {
  try {
    const { first_name, last_name, email, gender, salary} = req.body;
    const employee = new Employee({ first_name, last_name, email, gender, salary });
    await employee.save();
    res.status(201).json({ message: 'New employee created successfully', employee });
  } catch (error) {
    res.status(500).json({ error: "Failed to create"});
  }

});



// Define API endpoint to get employee details by ID
router.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


// PUT request to update an employee's details by their ID
router.put('/employees/:eid', (req, res) => {
  const employeeID = req.params.eid;
  const employeeData = req.body;

  Employee.findByIdAndUpdate(employeeID, employeeData, { new: true })
    .then(updatedEmployee => {
      if (!updatedEmployee) {
        return res.status(404).send('Employee not found');
      }
      res.status(200).json(updatedEmployee);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

// DELETE request
router.delete('/employees/:id', async (req, res) => {
  const employeeId = req.params.id; // Use a consistent variable name (employeeId)

  try {
    // find and delete the employee by ID
    const result = await Employee.deleteOne({ _id: employeeId }).exec();

    // check if employee was found and deleted
    if (result.deletedCount === 0) {
      return res.status(404).send('Employee not found');
    }

    // return success response
    return res.sendStatus(204);
  } catch (error) {
    console.error('An error occurred during delete:', error);
    return res.status(500).send('Internal Server Error');
  }
});


module.exports = router;