import { NEW_GAMES_BROWSER_DATA } from '../actions/types';

const initialState = {
    joinableGames: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case NEW_GAMES_BROWSER_DATA:
            return action.payload;
        default:
            return state;
    }
}