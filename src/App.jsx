import React from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import './App.css';
import ClientsPage from './containers/ClientsPage';
import RegistrationPage from './containers/RegistrationPage';
import ClientPage from './containers/ClientPage';
import ClientCommentsPage from './containers/ClientCommentsPage';
import BaseLayout from './components/BaseLayout';
import NavigationMenu from './components/NavigationMenu';

const Content = () => (
  <div className="content">
    <Route exact path="/" component={ClientsPage} />
    <Route exact path="/new" components={RegistrationPage} />
    <Route exact path="/:id" components={ClientPage} />
    <Route exact path="/:id/comments" component={ClientCommentsPage} />
  </div>
);

const App = () => (
  <div className="App">
    <BaseLayout
      navigation={<NavigationMenu />}
      content={<Content />}
    />
  </div>
);

export default hot(module)(App);
