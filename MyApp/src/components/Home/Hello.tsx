import './hello.css';
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Input, LinkButton, NavButtonGroup } from '@servicestack/react';
import { StateContext, client, Hello, signout } from '../../shared';

export const Home: React.FC<any> = (props:any) => {
    const {state, dispatch} = useContext(StateContext);
    const [name, setName] = useState('React');
    const [result, setResult] = useState('');

    useEffect(() => {
        (async () => {
            setResult(!name ? '' : (await client.get(new Hello({ name }) )).result)
        })();
    }, [name]); // fires when name changes

    return (<div>
        <div className="form-group">
            <p>/hello API</p>
            <Input value={name} onChange={setName} placeholder="Your name" />
            <h3 className="result pt-2">{ result }</h3>
        </div>
    </div>);
}
export default Home;