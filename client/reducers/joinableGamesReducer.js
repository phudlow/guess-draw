import { JOINED_GAME, RECIEVED_JOINABLE_GAMES_DATA } from '../actions/types';

const initialState = {
    joinableGames: [],
    game: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RECIEVED_JOINABLE_GAMES_DATA:
            return {
                ...state,
                joinableGames: action.payload
            };
        case JOINED_GAME:
            return {
                ...state,
                game: action.payload
            };
        default:
            return state;
    }
}