import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Transactions from './Transactions';
import Exchange from './Exchange';
import Header from './main/Header';
import Login from './Login';
import api, { setAuthHeaders, adminAuth } from './api';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('auth') || null);

  const authenticate = async (password) => {
    try {
      const response = await api.post('/userauth', { password }, { auth: adminAuth });
      localStorage.setItem('auth', response.data.access_token);
      setAuthToken(response.data.access_token);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // If the authToken changes, we update the axios instance
    setAuthHeaders(authToken);
  }, [authToken]);

  // If there is no authToken, we show the login screen
  if (!authToken) {
    return <Login authenticate={authenticate} />;
  }

  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Routes>
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/exchange" element={<Exchange />} />
              <Route path="*" element={<Transactions />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
