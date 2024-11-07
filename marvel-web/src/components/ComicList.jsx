import React from 'react';
import styles from '../styles/ComicList.module.css'


export default function ComicList({ comics, onSelectComic }) {
    return (
        <div className={styles.comicListContainer}>
            {comics.map((comic) => (
                <div
                    key={comic.id}
                    className={styles.comicItem}
                    onClick={() => onSelectComic(comic.id)}
                >
                    <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt={comic.title}
                        className={styles.comicImage}
                    />
                    <h3 className={styles.comicTitle}>{comic.title}</h3>
                </div>
            ))}
        </div>
    );
};