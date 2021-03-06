import React from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ClientsPage from './containers/ClientsPage';
import RegistrationPage from './containers/RegistrationPage';
import ClientPage from './containers/ClientPage';
import ClientCommentsPage from './containers/ClientCommentsPage';
import BaseLayout from './components/BaseLayout';
import NavigationMenu from './components/NavigationMenu';

const Content = () =>
    <div className='content'>
        <Route exact path='/' component={ClientsPage} />
        <Route exact path='/new' component={RegistrationPage} />
        <Route exact path='/user/:id/info' component={ClientPage} />
        <Route exact path='/user/:id/comments' component={ClientCommentsPage} />
    </div>
;

const App = () =>
    <div className='container-fluid'>
        <BaseLayout
            navigation={<NavigationMenu />}
            content={<Content />}
        />
    </div>
;

export default hot( module )( App );
