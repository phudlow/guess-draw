import React from 'react';
import { Provider} from 'react-redux';
import store from './store';

import MainContainer from './components/MainContainer';

const App = () => {
    return (
        <Provider store={store}>
            <MainContainer />
        </Provider>
    );
}

export default App;
