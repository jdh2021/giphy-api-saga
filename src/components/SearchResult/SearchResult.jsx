import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SearchResult({ gif, categories }) {
    const dispatch = useDispatch();
    const [categoryId, setCategoryId] = useState(categories[0].id);

    const submitFavorite = (categoryId, giphyId) => {
        console.log('selected category is:', categoryId);
        console.log('giphy_id to favorite is:', giphyId);
        if (categoryId === '') {
            alert('Please select a category');
            return;
        }
        else {
            dispatch({ type: 'POST_FAVORITE', payload: { giphy_id: giphyId, category_id: categoryId } })
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
                <button onClick={() => submitFavorite(categoryId, gif.id)}>Make Favorite</button>
            </td>
        </tr>
    )
}

export default SearchResult;