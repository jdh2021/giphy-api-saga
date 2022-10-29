import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Favorites() {
    // dispatch 'FETCH_FAVORITES' when component renders
    useEffect(() => {
        dispatch({ type: "FETCH_FAVORITES" })
    }, []);

    const categories = useSelector(store => store.categories);


    const dispatch = useDispatch();
    // const [categoryId, setCategoryId] = useState(categories[0].id);


    return (
        <div>
            <div>
                <Link to={'/'}><h3>Search GIFs</h3></Link>
            </div>
            <table>
                <thead><tr><td><h3>Favorites</h3></td></tr></thead>
                <tbody>
                    {/* {favoriteResults.map(gif => {
                        console.log(gif.images.fixed_height_small.url);
                        return (
                            <favorite
                                key={gif.id}
                                gif={gif}
                                categories={categories}
                            />
                        )
                    })} */}
                </tbody>
            </table>
        </div>
    )
}

export default Favorites;