// src/components/AdminAuthGuard.jsx
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import useUserStore from '../stores/userStore';

const AdminAuthGuard = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Check if there's a user and token
        if (user && token) {
          // Here you would validate if the user has admin role
          // For now, we'll simulate this check
          const isAdmin = true; // user.role === 'Admin';
          setIsAuthenticated(isAdmin);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user, token]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with a return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminAuthGuard;