import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


function Search() {
    const dispatch = useDispatch();
    // local state for changeable values of input fields
    const [searchTerm, setSearchTerm] = useState('');

    const submitSearch = () => {
        console.log('searchTerm is:', searchTerm);
        dispatch({ type: 'FETCH_GIFS', payload: searchTerm})
    }

    return(
        <div>
        <div>
            <h3>Search</h3>
            <input type="text" placeholder="Search Term" value={searchTerm} onChange={(event) =>setSearchTerm(event.target.value)} />
            <button onClick={submitSearch}>Submit</button>
        </div>
        <h3>Search Results</h3>
        </div>
    )
}

export default Search;