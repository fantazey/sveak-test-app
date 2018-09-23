import React from 'react';
import { NavLink } from 'react-router-dom';

const NAV = [
    { path: '/auth', label: 'Log in' },
    { path: '/', label: 'Clients list' },
    { path: '/new', label: 'Registration' },
    { path: '/:id/comments', label: 'Comments' }
];

const NavigationMenu = () => (
    <nav className='navbar bg-light'>
        <ul className='nav nav-pills'>
            { NAV.map( ( item, index ) => <li className='nav-item' key={`navigation_li-_${index}`}>
                <NavLink
                    exact
                    key={`navigation_${index}`}
                    className='nav-link'
                    activeClassName='active'
                    to={item.path}>{item.label}
                </NavLink>
            </li> ) }
        </ul>
    </nav>
);


export default NavigationMenu;
