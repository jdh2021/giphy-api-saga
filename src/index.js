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
    yield takeEvery('FETCH_FAVORITES', fetchFavorites);
    yield takeEvery('PUT_FAVORITE', putFavorite);
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

function* fetchFavorites() {
    try {
        console.log('in fetchFavorites');
        const favorites = yield axios.get('/api/favorite');
        console.log('in fetchFavorites. Favorite GIFs are:', favorites.data);
        // after successful GET, dispatch action SET_FAVORITES
        yield put({type: 'SET_FAVORITES', payload: favorites.data});
    } catch (error) {
        console.log('Error in fetchFavorites:', error);
        alert('Error in fetchFavorites');
    }
}

function* postFavorite(action) {
    try {
        console.log('favorited giphy id is:', action.payload.giphy_id);
        console.log('category id of favorite GIF is:', action.payload.category_id);
        console.log('url of favorited GIF is:', action.payload.giphy_url);
        yield axios.post('/api/favorite', action.payload);
        console.log('postFavorite success');
    } catch (error) {
        console.log('Error in postFavorite:', error);
        alert('Error in postFavorite');
    }
}

function* putFavorite(action) {
    try {
        yield axios.put('/api/favorite', action.payload);
        // after successful PUT, dispatch 'FETCH_FAVORITES'
        yield put({type: 'FETCH_FAVORITES'});
    } catch (error) {
        console.log('Error in putFavorite:', error);
        alert('Error in putFavorite');
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

// reducer to store favorites from server
const favorites = (state = [], action) => {
    if (action.type === "SET_FAVORITES") {
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
        favorites
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
