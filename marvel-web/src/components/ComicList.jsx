import React from 'react';
import styles from '../styles/ComicList.module.css'

export default function ComicList({comics}){
    return(
        <div className={styles.comicListContainer}>
            {comics.map((comic)=>{
                return(
                        <div className={styles.comicItem}>
                            <img className={styles.comicImage} src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title}/>
                            <p>{comics.description}</p>
                            <h3 className={styles.comicTitle}>{comic.title}</h3>
                        </div>
                )
            })}
        </div>
    )
}