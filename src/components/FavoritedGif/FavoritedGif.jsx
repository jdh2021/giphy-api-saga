import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function FavoritedGif({ favorite }) {
    const dispatch = useDispatch();
    const [categoryId, setCategoryId] = useState(favorite.category_id);

    const categories = useSelector(store => store.categories);

    const updateFavorite = ( favoriteId, categoryId) => {
        console.log('in updateFavorite');
        dispatch({ type: 'PUT_FAVORITE', payload: { id: favoriteId, category_id: categoryId }});
    }

    return (
        <tr key={favorite.id}>
            <td>
                <img src={favorite.giphy_url} width="250" height="250" />
                <br />
                <label> Category: </label>
                <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
                    {categories.map(category => {
                        return (
                            <option value={category.id} key={category.id}>{category.name}</option>
                        )
                    })}
                </select>
                <br />
                <button onClick={() => updateFavorite(favorite.id, categoryId)}>Update</button>
            </td>
        </tr>
    )
}

export default FavoritedGif;