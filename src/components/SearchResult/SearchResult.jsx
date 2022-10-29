import { useState, useEffect } from 'react';

function SearchResult({gif, categories }) {

    const [categoryInput, setCategoryInput] = useState('');

    const submitFavorite = (category, url) => {
        console.log('selected category is:', category);
        console.log('gif url is:', url);

    }

    return (
        <tr key={gif.id}>
            <td>
                <img src={gif.images.fixed_height_small.url} width="250" height="250" />
                <br />
                <label> Choose a category: </label>
                <select value={categoryInput} onChange={(event) => setCategoryInput(event.target.value)}>
                    {categories.map(category => {
                        return (
                            <option value={category.name} key={category.id}>{category.name}</option>
                        )
                    })}
                </select>
                <br />
                <button onClick={() => submitFavorite(categoryInput, gif.images.fixed_height_small.url)}>Make Favorite</button>
            </td>
        </tr>
    )
}

export default SearchResult;