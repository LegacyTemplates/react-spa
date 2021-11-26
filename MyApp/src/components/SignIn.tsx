import * as React from 'react';
import { useState, useContext } from 'react';
import { ErrorSummary, Input, CheckBox, Button, LinkButton, NavButtonGroup } from '@servicestack/react';
import { withRouter } from 'react-router-dom';
import { StateContext, client, Routes, queryString, redirect, classNames } from '../shared';
import { Authenticate } from '../shared/dtos';

export const SignIn = withRouter(({ history }) => {
    const {state, dispatch} = useContext(StateContext);

    const redirectTo = queryString(history.location.search).redirect || Routes.Home;
    if (state.userSession != null) {
        redirect(history, redirectTo);
        return null;
    }

    const [loading, setLoading] = useState(false);
    const [responseStatus, setResponseStatus] = useState(null);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);

    const switchUser = (email:string) => {
        setUserName(email);
        setPassword('p@55wOrd');
    };

    const submit = async () => {
        try {
            setLoading(true);
            setResponseStatus(null);

            const response = await client.post(new Authenticate({
                provider: 'credentials',
                userName,
                password,
                rememberMe,
            }));

            setLoading(false);
            dispatch({ type:'signin', data:response });
            redirect(history, redirectTo);

        } catch (e: any) {
            setResponseStatus(e.responseStatus || e);
            setLoading(false);
        }
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => { e.preventDefault(); await submit(); };
    const switchAdmin = () => switchUser('admin@email.com');
    const switchNewUser = () => switchUser('new@user.com');

    return (<div className="row">
        <div className="col-4">
            <h3>Sign In</h3>

            <form className={classNames({error:responseStatus, loading})} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <ErrorSummary except={'userName,password'} responseStatus={responseStatus} />
                </div>
                <div className="mb-3">
                    <Input type="text" id="userName" value={userName} onChange={setUserName} responseStatus={responseStatus} placeholder="UserName"
                        label="Email"  help="Email you signed up with" />
                </div>
                <div className="mb-3">
                    <Input type="password" id="password" value={password} onChange={setPassword} responseStatus={responseStatus} placeholder="Password"
                        label="Password"  help="6 characters or more" />
                </div>
                <div className="mb-3">
                    <CheckBox id="rememberMe" value={rememberMe} onChange={setRememberMe} responseStatus={responseStatus}>
                        Remember Me
                    </CheckBox>
                </div>
                <div className="mb-3">
                    <Button type="submit" lg primary>Login</Button>
                    <LinkButton href="/signup" lg outline-secondary className="ms-2">Register New User</LinkButton>
                </div>
            </form>

            <div className="pt-3">
                <h5>Quick Login:</h5>
                <div className="btn-group">
                    <LinkButton outline-info sm onClick={switchAdmin}>admin@email.com</LinkButton>
                    <LinkButton outline-info sm onClick={switchNewUser}>new@user.com</LinkButton>
                </div>
            </div>
        </div>
        <div className="col-3"></div>
        <div className="col-5">
            <div className="row justify-content-end mt-5" style={{maxWidth:300}}>
                <NavButtonGroup navClass="nav-button-group" 
                    items={state.nav.navItemsMap.auth} attributes={state.userAttributes} baseHref={state.nav.baseUrl} lg />
            </div>
        </div>
    </div>);
});
