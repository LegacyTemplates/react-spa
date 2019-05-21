import './hello.css';

import * as React from 'react';
import { Input } from '@servicestack/react';
import { client, Hello } from '../../shared';

export const HelloApi: React.FC<any> = (props:any) => {
    const [name, setName] = React.useState('React');
    const [result, setResult] = React.useState('');

    React.useEffect(() => {
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
