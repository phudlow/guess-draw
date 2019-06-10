import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import { joinedGame, recievedJoinableGamesData } from '../actions/joinableGamesActions';

class GamesBrowser extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        socket.emit('requestjoinablegames');
    }
    render() {
        if (!this.props.game && !this.props.nickName) {
            return;
        }
        return (
            <div id="games-browser">
                <span>
                    <h4>Games Browser</h4>
                    <button>Create</button>
                </span>
                <table id="games-list">
                    <thead>
                        <tr>
                            <th>Creator</th>
                            <th>Players</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Joe</td>
                            <td>3 / 4</td>
                            <td><button>Join</button></td>
                        </tr>
                        <tr>
                            <td>Patrick</td>
                            <td>6 / 8</td>
                            <td><button>Join</button></td>
                        </tr>
                        <tr>
                            <td>Maria</td>
                            <td>1 / 4</td>
                            <td><button>Join</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        game: state.game,
        nickName: state.nickName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        joinedGame: data => dispatch(joinedGame(data)),
        recievedJoinableGamesData: data => dispatch(recievedJoinableGamesData(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesBrowser);
