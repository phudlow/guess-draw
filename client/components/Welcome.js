import React, { Component } from 'react';

class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: ''
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState(e.target.value);
    }

    render() {
        return (
            <div id="welcome">
                <h1>Welcome to Guess Draw!</h1>
                <form id="nickname">
                    <label>
                        Type a Nickname:
                        <input type="text" name="nickname" onChange={this.onChange}/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Welcome;
