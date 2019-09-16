import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import snackbar from './reducers/snackbar.reducer';

const store = combineReducers({
    snackbar,
});

export default createStore(store, applyMiddleware(thunk));