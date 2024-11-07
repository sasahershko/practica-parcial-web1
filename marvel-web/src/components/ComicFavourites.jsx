import {useState} from 'react';

export default function ComicFavourites({localStorageKey}) {
    const [favourites, setFavourites] = useState([]);

    const handleAddFavourite = (comic) => {
        setFavourites([...favourites, comic]);
    };

    const handleRemoveFavourite = (comic) => {
        const newFavourites = favourites.filter((favourite) => favourite.id !== comic.id);
        setFavourites(newFavourites);
    };

    return (
        <div>
            <h2>Favourites</h2>
            <ul>
                {favourites.map((comic) => (
                    <li key={comic.id}>
                        <h3>{comic.title}</h3>
                        <button onClick={() => handleRemoveFavourite(comic)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}