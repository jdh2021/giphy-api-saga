import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function FavoritedGif({ gif}) {
    const dispatch = useDispatch();
    const [categoryId, setCategoryId] = useState(gif.category_id);

    const categories = useSelector(store => store.categories);

    return (
        <tr key={gif.id}>
            <td>
                <img src={gif.giphy_url} width="250" height="250" />
                <br />
                <label> Update Category: </label>
                <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
                    {categories.map(category => {
                        return (
                            <option value={category.id} key={category.id}>{category.name}</option>
                        )
                    })}
                </select>
                {/* <br />
                <button onClick={() => updateFavorite(categoryId, gif.id, gif.images.fixed_height_small.url)}>Favorite</button> */}
            </td>
        </tr>
    )
}

export default FavoritedGif;