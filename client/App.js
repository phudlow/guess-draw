import React, { Component } from 'react';

import Welcome from './components/Welcome';
import GamesBrowser from './components/GamesBrowser';
import Game from './components/Game';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <div id="app">
                <Welcome />
                <GamesBrowser />
                <Game />
            </div>
        )
    }
}

export default App;
