import React from 'react';
import { Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import './App.css';
import ClientsPage from './containers/ClientsPage';
import RegistrationPage from './containers/RegistrationPage';
import ClientPage from './containers/ClientPage';
import ClientCommentsPage from './containers/ClientCommentsPage';

const App = () => (
  <div className="App">
    <header>
      <Link to="/" >Clients</Link>
      <Link to="/new">Registration</Link>
    </header>
    <body>
      <Route exact path="/" component={ClientsPage} />
      <Route exact path="/new" components={RegistrationPage} />
      <Route exact path="/:id" components={ClientPage} />
      <Route exact path="/:id/comments" component={ClientCommentsPage} />
    </body>
  </div>
);

export default hot(module)(App);
