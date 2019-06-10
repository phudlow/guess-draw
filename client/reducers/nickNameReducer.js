import { NICKNAME_CONFIRMED } from '../actions/types';

const initialState = {
    nickName: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case NICKNAME_CONFIRMED:
            return {
                ...state,
                nickName: action.payload
            };
        default:
            return state;
    }
}