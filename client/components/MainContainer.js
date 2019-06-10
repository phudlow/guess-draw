import React, { Component } from 'react';
import { connect } from 'react-redux';

import Welcome from './Welcome';
import GamesBrowser from './GamesBrowser';
import GameLobby from './GameLobby';
import Game from './Game';
import GameResults from './GameResults';

class MainContainer extends Component {
    render() {
        let activeScreen;

        if (!this.props.nickName) {
            activeScreen = <Welcome onNickNameSubmit={this.onNickNameSubmit} />;
        }
        else if (!this.props.game) {
            activeScreen = <GamesBrowser onGameJoined={this.onGameJoined} />;
        }
        else if (this.props.game.status === 'lobby') {
            activeScreen = <GameLobby />;
        }
        else if (this.props.game.status === 'active') {
            activeScreen = <Game />;
        }
        else if (this.props.game.status === 'ended') {
            activeScreen = <GameResults />;
        }
        return (
            <div>
                {activeScreen}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        game: state.game,
        nickName: state.nickName
    }
}

export default connect(mapStateToProps, null)(MainContainer);