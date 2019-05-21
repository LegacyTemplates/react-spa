import * as React from 'react';
import { StateContext } from '../../shared';

export const Admin: React.FC<any> = () => {

    const { state, dispatch } = React.useContext(StateContext);
    const user = state.userSession!;
    const roles = user && user.roles;

    return (
        <div id="admin" className="text-center">
            <div className="svg-female-business svg-8x ml-2"/>
            <h3>Admin Page</h3>
            <p>
                {user.userName}
            </p>
            <p className="roles">
                {roles && roles.map(x => <mark key={x}>{x}</mark>)}
            </p>
        </div>
    );
}
