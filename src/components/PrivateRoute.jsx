// import React from 'react';
// import { auth } from '../firebase';
// import { Navigate, Route } from 'react-router-dom';

// const PrivateRoute = ({ element: Element}) => {
//     const isAuthenticated = auth.currentUser !== null;

//     return isAuthenticated ? <Element /> : <Navigate to="/" />
// };

// export default PrivateRoute;


import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth } from "../firebase";


const PrivateRoute = ({ element: Element }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can show a loading spinner while Firebase authentication state is being checked.
  }

  return <Route element={authenticated ? <Element /> : <Navigate to="/login" />} />;
};

export default PrivateRoute;
