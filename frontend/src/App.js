import React, { useState } from 'react';
import NavigationBar from './components/NavigationBar';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Appointments from './components/Appointments';
import Home from './components/Hero';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import axios from 'axios';
import AuthRoute from './helper/AuthRoute';

import { createContext } from 'react';

export const UserContext = createContext(null);
export const AuthContext = createContext(null);

function App() {
  axios.defaults.baseURL = 'http://localhost:3001/api/';

  const [auth, setAuth] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  function updateAuth(token) {
    setAuth(token);
  }
  function updateUserDetails(userData) {
    setUserDetails(userData);
  }

  return (
    <Router>
      {console.log(auth)}
      {console.log(userDetails)}
      <ChakraProvider theme={theme}>
        <AuthContext.Provider value={{ auth, updateAuth }}>
          <UserContext.Provider value={{ userDetails, updateUserDetails }}>
            <ToastContainer transition={Bounce} />
            <NavigationBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <AuthRoute auth={auth}>
                    <Dashboard />
                  </AuthRoute>
                }
              />
            </Routes>
            <Footer />
          </UserContext.Provider>
        </AuthContext.Provider>
      </ChakraProvider>
    </Router>
  );
}

export default App;
