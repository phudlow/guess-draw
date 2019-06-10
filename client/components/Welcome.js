import React, { Component } from 'react';
import { nickNameConfirmed } from '../actions/nickNameActions';
import socket from '../socket';
import { connect } from 'react-redux';

class Welcome extends Component {
    constructor(props) {
        super(props);

        this.onNickNameSubmit = this.onNickNameSubmit.bind(this);

        // Handle nickname submission responses from socket
        socket.on('nicknamedenied', nickName => {
            this.refs.nickName.focus();
            alert(`Nickname ${nickName} denied.`);
        });
        socket.on('nicknameconfirmed', nickName => {
            this.props.nickNameConfirmed(nickName);
        });
    }
    onNickNameSubmit(e) {
        e.preventDefault();
        const input = this.refs.nickName;
        const value = input.value.trim();

        if (!value) {
            input.focus();
            return;
        }
        socket.emit('nicknamesubmitted', value);
    }
    render() {
        if (this.props.nickName) {
            return null;
        }
        return (
            <div id="welcome">
                <h1>Welcome to Guess Draw!</h1>
                <form onSubmit={this.onNickNameSubmit}>
                    <label>
                        Type a Nickname:
                        <input ref="nickName" type="text" maxLength="12" />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        nickName: state.nickName
    };
}

const mapDispatchToProps = dispatch => {
    return {
        nickNameConfirmed: nickName => dispatch(nickNameConfirmed(nickName))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
