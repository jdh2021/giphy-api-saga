import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoritedGif from '../FavoritedGif/FavoritedGif';


function Favorites() {

    const dispatch = useDispatch();

    // dispatch 'FETCH_FAVORITES' when component renders
    useEffect(() => {
        dispatch({ type: "FETCH_FAVORITES" })
    }, []);

    const categories = useSelector(store => store.categories);
    const favorites = useSelector(store => store.favorites);


    return (
        <div>
            <div>
                <Link to={'/'}><h3>Search GIFs</h3></Link>
            </div>
            <table>
                <thead><tr><td><h3>Favorites</h3></td></tr></thead>
                <tbody>
                    {favorites.map(favorite => {
                        return (
                            <FavoritedGif
                                key={favorite.giphy_id}
                                favorite={favorite}
                                categories={categories}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Favorites;