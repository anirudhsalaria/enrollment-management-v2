import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Form from "./components/Form/Form";
import Checkout from "./components/Checkout/Checkout";
import Dashboard from "./components/Dashboard/Dashboard";
import { UserProvider } from "./components/UserContext";
import { auth } from "./firebase";

import "./App.css";
import Success from "./components/Success/Success";
import Cancel from "./components/Cancel/Cancel";
import PrivateRoute from "./components/PrivateRoute";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Admindashboard from "./components/AdminDashboard/Admindashboard";
import Counsellor from "./components/Counsellor/Counsellor";
import CounsellorRequests from "./components/CounsellorRequests/CounsellorRequests";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Form" element={<Form />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/AdminDashboard" element={<Admindashboard />} />
            <Route path="/Counsellor" element={<Counsellor />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/Dashboard" element={<Dashboard name={userName} />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/" element={<Home name={userName} />} />
            <Route path="/CounsellorRequests" element={<CounsellorRequests/>}/>
        </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
