// components/FavouriteSidebar.js
import styles from '../styles/FavouriteSidebar.module.css';

export default function FavouriteSidebar({ onSelectComic, isVisible, favourites, toggleSidebar, handleFavourites }) {
    const handleSelectFavourite = (comicId) => {
        onSelectComic(`comics/${comicId}`);
    };

    return (
        <>
            {/* Botón para abrir el sidebar */}
            {!isVisible && (
                <button onClick={toggleSidebar} className={styles.openSidebarButton}>
                    Favoritos
                </button>
            )}

            {/* Sidebar */}
            <div className={`${styles.sidebar} ${isVisible ? styles.visible : ''}`}>
                <button onClick={toggleSidebar} className={styles.closeSidebarButton}>×</button>
                <h2>Favoritos</h2>
                {favourites.length > 0 ? (
                    favourites.map((comic) => (
                        <div>
                            <div
                                key={comic.id}
                                className={styles.favoriteItem}
                                onClick={() => handleSelectFavourite(comic.id)}
                            >
                                <img
                                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                    alt={comic.title}
                                    className={styles.favoriteImage}
                                />
                                <h4>{comic.title}</h4>
                            </div>
                            <div>
                                <button onClick={() => handleFavourites(comic)} className={styles.deleteButton}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay favoritos guardados</p>
                )}
            </div>
        </>
    );
}
