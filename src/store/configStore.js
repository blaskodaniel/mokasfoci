import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import rootReducer from './reducers/index';

export default function configStore(initstate){
    const composeTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        rootReducer, 
        initstate,
        composeTools(applyMiddleware(thunk, logger))
    );
}