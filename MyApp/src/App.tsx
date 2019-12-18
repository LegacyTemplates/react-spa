import 'es6-shim';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Routes, Roles, StateContext } from './shared';
import { Navbar, Fallback, Forbidden } from '@servicestack/react';

import { Home } from './components/Home';
import { About } from './components/About';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { Profile } from './components/Profile';
import { Admin } from './components/Admin';
import { Calculator } from './components/Calc/calc';

export const App: React.FC<any> = () => {
    const { state, dispatch } = React.useContext(StateContext);

    const renderHome = () => <Home name="React" />;
    const renderAbout = () => <About message="About page" />;

    const requiresAuth = (Component:any, path?:string) => {
        if (!state.userSession) {
            return () => <Redirect to={{ pathname: Routes.SignIn, search: '?redirect=' + path }}/>;
        }
        return () => <Component/>;
    };
    const requiresRole = (role:string, Component:React.FC<any>, path?:string) => {
        if (!state.userSession) {
            return () => <Redirect to={{ pathname: Routes.SignIn, search: '?redirect=' + path }}/>;
        }
        if (!state.userSession.roles || state.userSession.roles.indexOf(role) < 0) {
            return () => <Forbidden path={path} role={role} />;
        }
        return () => <Component/>;
    };

    return (<Router>
        <div>
            <Calculator />
        </div>
    </Router>);
}
