import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/users");
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    // You can render a loading spinner or message here
    return <div>Loading...</div>;
  }

  // Check if the user exists in the user data
  const authenticatedUsername = localStorage.getItem("authenticated");
  const isAuthenticated = users.some((user) => user.userid === authenticatedUsername);

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;