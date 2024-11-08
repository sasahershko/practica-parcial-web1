import React from 'react';
import styles from '../styles/ComicList.module.css'


export default function ComicList({ comics, onSelectComic }) {
    //crear función para coger el último segmento de la url que será el id del personajes

    return (
        <div className={styles.comicListContainer}>
            {comics.map((comic) => (
                <div
                    key={comic.id}
                    className={styles.comicItem}
                    onClick={() => onSelectComic('comics/' + comic.id)}
                >
                    <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt={comic.title}
                        className={styles.comicImage}
                    />
                    <h3 className={styles.comicTitle}>{comic.title}</h3>
                    <p className={styles.comicTitle}>{new Date(comic.modified).toLocaleDateString('es-ES', {year: 'numeric', month:'numeric', day:'numeric'})}</p>
                </div>
            ))}
        </div>
    );
};