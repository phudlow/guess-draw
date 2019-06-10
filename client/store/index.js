import { createStore } from 'redux';
import rootReducer from '../reducers';

const initialState = {
    nickName: '',
    game: null,
    joinableGames: []
};

const store = createStore(rootReducer, initialState);

export default store;