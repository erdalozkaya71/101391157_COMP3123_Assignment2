// validate employee data
const employeeData = (req, res, next) => {
    const { first_name, last_name, email, gender, salary} = req.body //|| mockEmployees;;
    if (!(first_name && last_name &&email &&gender && salary)) {
        return res.status(400).json({ error: 'Incomplete data' });
    }
    next();
};

const userData = (req, res, next) => {
    const { username, email, password } = req.body //|| mockUsers;;
    if (!(username && email && password)) {
        return res.status(400).json({ error: 'Incomplete data' });
    }
    next();
};

module.exports = {employeeData, userData};

