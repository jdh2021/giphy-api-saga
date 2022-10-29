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
    yield takeEvery('FETCH_GIFS', fetchGifs);
};


function* fetchGifs(action) {
    try {
        console.log('searchTerm is:', action.payload);
        const searchResults = yield axios.get(`/api/search/${action.payload}`);
        console.log('in fetchGifs. Search results are:', searchResults.data.data);
        // after successful GET, dispatch action SET_SEARCH_RESULTS
        yield put({type: 'SET_SEARCH_RESULTS', payload: searchResults.data.data});
    } catch (error) {
        console.log('Error in fetchGifs:', error);
        alert('Error in fetchGifs');
    }
}

// create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

const results = (state = [], action) => {
    if (action.type === "SET_SEARCH_RESULTS") {
        return action.payload;
    } 
    return state;
}

// create store that components can use
const storeInstance = createStore(
    combineReducers({
        //reducers go here
        results
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
