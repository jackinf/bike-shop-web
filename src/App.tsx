import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Bikes from './pages/bikes';
import AuthContext from './components/Auth';
import LoginLogout from './components/LoginLogout';

const App: React.FC = () => {
  return (
    <AuthContext>
      <LoginLogout>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/bikes">Bikes</Link>
              </li>
            </ul>

            <hr />

            <Route exact path="/bikes" component={Bikes} />
          </div>
        </Router>
      </LoginLogout>
    </AuthContext>
  );
};

export default App;
