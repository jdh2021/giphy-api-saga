import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SearchResult({ gif, categories }) {
    const dispatch = useDispatch();
    // useSelector to retrieve favorites from store
    const favorites = useSelector(store => store.favorites);

    // local state to set default value of category
    const [categoryId, setCategoryId] = useState(categories[0].id);
    
    // local state for favorite status of Search Result
    const [favoriteStatus, setFavoriteStatus] = useState(false);

    // calls checkFavoriteStatus when length of favorites array changes
    useEffect(() => {
        checkFavoriteStatus();
    }, [favorites.length]);

    const submitFavorite = (categoryId, giphyId, giphyUrl) => {
        console.log('selected category is:', categoryId);
        console.log('giphy_id to favorite is:', giphyId);
        if (categoryId === '') {
            alert('Please select a category');
            return;
        }
        else {
            dispatch({ type: 'POST_FAVORITE', payload: { giphy_id: giphyId, category_id: categoryId, giphy_url: giphyUrl }})
        }
    }

    // loops over favorites array from store. if id of Search Result matches id of existing favorite, sets favoriteStatus to true
    // allows for conditional rendering of Favorite button
    const checkFavoriteStatus = () => {
        for (let favorite of favorites) {
            if (favorite.giphy_id === gif.id) {
                setFavoriteStatus(true);
                return;
            }
        }
    }

    return (
        <tr key={gif.id}>
            <td>
                <img src={gif.images.fixed_height_small.url} width="250" height="250" />
                <br />
                <label> Choose a category: </label>
                <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
                    {categories.map(category => {
                        return (
                            <option value={category.id} key={category.id}>{category.name}</option>
                        )
                    })}
                </select>
                <br />
                {favoriteStatus ?
                    <button disabled>Already Favorited</button> :
                    <button onClick={() => submitFavorite(categoryId, gif.id, gif.images.fixed_height_small.url)}>Favorite</button>
                }
            </td>
        </tr>
    )
}

export default SearchResult;
