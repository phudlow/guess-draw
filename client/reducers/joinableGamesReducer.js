import { RECIEVED_JOINABLE_GAMES_DATA } from '../actions/types';

const initialState = {
    joinableGames: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RECIEVED_JOINABLE_GAMES_DATA:
            return action.payload;
        default:
            return state;
    }
}