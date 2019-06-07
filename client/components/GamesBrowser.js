import React from 'react';

function GamesBrowser() {
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

export default GamesBrowser;
