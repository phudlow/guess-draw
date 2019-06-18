import './index.scss';

import ReactDOM from 'react-dom';
import React from 'react';

import App from './App';

async () => {
    const foo = new Promise((resolve, reject) => {
        window.setTimeout(() => {
            const msg = 'Two seconds have passed...';
            resolve(msg);
        }, 2000);
    });

    await foo.then((msg) => {
        console.log('Promise resolved.');
        console.log(msg);
    })
}

ReactDOM.render(<App />, document.getElementById('root'));
