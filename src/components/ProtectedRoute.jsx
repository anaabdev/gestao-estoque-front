import { Navigate, useLocation } from "react-router-dom";
import { useAppSettings } from "../../context/useAppSettings.js";
import { api } from "../../services/api.js";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const { t } = useAppSettings();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;
    api.me()
      .then(() => {
        if (active) setIsAuthenticated(true);
      })
      .catch(() => {
        if (active) setIsAuthenticated(false);
      })
      .finally(() => {
        if (active) setAuthChecked(true);
      });
    return () => { active = false; };
  }, []);

  if (!authChecked) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;