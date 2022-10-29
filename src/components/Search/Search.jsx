import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchResult from '../SearchResult/SearchResult';


function Search() {
    const dispatch = useDispatch();
    // local state for changeable values of input fields
    const [searchTerm, setSearchTerm] = useState('');

    //useSelector to retrieve search results from store
    const searchResults = useSelector(store => store.results);
    const categories = useSelector(store => store.categories);

    const submitSearch = () => {
        console.log('searchTerm is:', searchTerm);
        dispatch({ type: 'FETCH_GIFS', payload: searchTerm })
    }



    // dispatch 'FETCH_CATEGORIES' when page loads
    useEffect(() => {
        dispatch({ type: "FETCH_CATEGORIES" })
    }, []);

    return (
        <div>
            <div>
                <h3>Search</h3>
                <input type="text" placeholder="Search Term" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
                <button onClick={submitSearch}>Submit</button>
            </div>
            <table>
                <thead><tr><td><h3>Search Results</h3></td></tr></thead>
                <tbody>
                    {searchResults.map(gif => {
                        console.log(gif.images.fixed_height_small.url);
                        return (
                            <SearchResult
                                key={gif.id}
                                gif={gif}
                                categories={categories}
                            />
                        )
                    })}
                            </tbody>
            </table>
        </div>
    )
}

export default Search;