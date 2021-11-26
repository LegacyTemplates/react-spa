import * as React from 'react';
import { useState, useContext } from 'react';
import { StateContext, client, checkAuth, Routes, toPascalCase, splitOnFirst, classNames } from '../shared';
import { Register } from '../shared/dtos';
import { ErrorSummary, Input, CheckBox, Button, LinkButton } from '@servicestack/react';
import { withRouter } from 'react-router-dom';

export const SignUp = withRouter(({ history }) => {
    const { dispatch } = useContext(StateContext);

    const [loading, setLoading] = useState(false);
    const [responseStatus, setResponseStatus] = useState(null);

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [autoLogin, setAutoLogin] = useState(true);

    const newUser = (s:string) => {
        const names = s.split('@');
        setDisplayName(toPascalCase(names[0]) + ' ' + toPascalCase(splitOnFirst(names[1],'.')[0]));
        setEmail(s);
        setPassword('p@55wOrd');
        setConfirmPassword('p@55wOrd');
    }

    const submit = async () => {
        try {
            setLoading(true);
            setResponseStatus(null);

            await client.post(new Register({
                displayName,
                email,
                password,
                confirmPassword,
                autoLogin,
            }));

            await checkAuth(dispatch);
            setLoading(false);

            history.push(Routes.Home);
        } catch (e: any) {
            setResponseStatus(e.responseStatus || e);
            setLoading(false);
        }
    };

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => { e.preventDefault(); await submit(); };
    const handleNewUser = () => newUser('new@user.com');

    return (<div className="row">
        <div className="col-4">
            <h3>Register New User</h3>

            <form className={classNames({error:responseStatus, loading})} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <ErrorSummary except={'displayName,email,password,confirmPassword'} responseStatus={responseStatus} />
                </div>
                <div className="mb-3">
                    <Input type="text" id="displayName" value={displayName} onChange={setDisplayName} responseStatus={responseStatus}
                        placeholder="Display Name" label="Name" help="Your first and last name" />
                </div>
                <div className="mb-3">
                    <Input type="text" id="email" value={email} onChange={setEmail} responseStatus={responseStatus}
                        placeholder="Email" label="Email" />
                </div>
                <div className="mb-3">
                    <Input type="password" id="password" value={password} onChange={setPassword} responseStatus={responseStatus}
                        placeholder="Password" label="Password" />
                </div>
                <div className="mb-3">
                    <Input type="password" id="confirmPassword" value={confirmPassword} onChange={setConfirmPassword} responseStatus={responseStatus}
                        placeholder="Confirm" label="Confirm Password" />
                </div>
                <div className="mb-3">
                    <CheckBox id="autoLogin" value={autoLogin} onChange={setAutoLogin} responseStatus={responseStatus}>
                        Auto Login
                    </CheckBox>
                </div>
                <div className="mb-3">
                    <Button type="submit" lg primary>Register</Button>
                    <LinkButton href="/signin" navItemClass="btn btn-lg ms-2">Sign In</LinkButton>
                </div>
                <div className="pt-3">
                    <h5>Quick Populate:</h5>
                    <p className="pt-1">
                        <LinkButton outline-info sm onClick={handleNewUser}>new@user.com</LinkButton>
                    </p>
                </div>
            </form>
        </div>
    </div>);
});