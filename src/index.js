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
    yield takeEvery('FETCH_CATEGORIES', fetchCategories);
    yield takeEvery('POST_FAVORITE', postFavorite);
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

function* fetchCategories() {
    try {
        console.log('in fetchCategories');
        const categories = yield axios.get('/api/category');
        console.log('in fetchCategories. Categories are:', categories.data);
        // after successful GET, dispatch action SET_SEARCH_RESULTS
        yield put({type: 'SET_CATEGORIES', payload: categories.data});
    } catch (error) {
        console.log('Error in fetchCategories:', error);
        alert('Error in fetchCategories');
    }
}

function* postFavorite(action) {
    try {
        console.log('favorited giphy id is:', action.payload.giphy_id);
        console.log('category id of favorite GIF is:', action.payload.category_id);
        yield axios.post('/api/favorite', action.payload);
        console.log('postFavorite success');
    } catch (error) {
        console.log('Error in postFavorite:', error);
        alert('Error in postFavorite');
    }
}


// create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// reducer to store results from API request 
const results = (state = [], action) => {
    if (action.type === "SET_SEARCH_RESULTS") {
        return action.payload;
    } 
    return state;
}

// reducer to store categories from server
const categories = (state = [], action) => {
    if (action.type === "SET_CATEGORIES") {
        return action.payload;
    } 
    return state;
}

// create store that components can use
const storeInstance = createStore(
    combineReducers({
        //reducers go here
        results,
        categories,
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
