import ReactDOM from 'react-dom';
import App from './components/App/App';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from "react-redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// rootSaga generator function
function* rootSaga() {
    // watch for action, call generator function
    console.log('rootSaga');
};

// create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// create store that components can use
const storeInstance = createStore(
    combineReducers({
        //reducers go here
    }),
    // sagaMiddleware for store
    applyMiddleware(sagaMiddleware, logger),
);

// rootSaga passed into sagaMiddleware
sagaMiddleware.run(rootSaga);

// provider for store
ReactDOM.render(
    <Provider store={storeInstance}>
        <App />
    </Provider>,
    document.getElementById('root'));
