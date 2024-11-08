import {useState, useEffect} from 'react';
import styles from '../styles/ComicDetail.module.css'; 
import InfoCharacter from './InfoCharacter';

export default function ComicDetail ({ comic, onClose, handleFavourite, favourites }) {

    const toggleFavourite = () =>{
        handleFavourite(comic);
    };

    //para que no funcione el scroll en la página principal mientras estamos en el modal
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    if(!comic){
        console.log('No hay comic seleccionado');
        return null;
    }

    return (
        <div className={styles.modalBackground} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>

                {/* BOTÓN PARA CERRAR */}
                <button className={styles.closeButton} onClick={onClose} >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                    <linearGradient id="hbE9Evnj3wAjjA2RX0We2a_OZuepOQd0omj_gr1" x1="7.534" x2="27.557" y1="7.534" y2="27.557" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f44f5a"></stop><stop offset=".443" stop-color="#ee3d4a"></stop><stop offset="1" stop-color="#e52030"></stop></linearGradient><path fill="url(#hbE9Evnj3wAjjA2RX0We2a_OZuepOQd0omj_gr1)" d="M42.42,12.401c0.774-0.774,0.774-2.028,0-2.802L38.401,5.58c-0.774-0.774-2.028-0.774-2.802,0	L24,17.179L12.401,5.58c-0.774-0.774-2.028-0.774-2.802,0L5.58,9.599c-0.774,0.774-0.774,2.028,0,2.802L17.179,24L5.58,35.599	c-0.774,0.774-0.774,2.028,0,2.802l4.019,4.019c0.774,0.774,2.028,0.774,2.802,0L42.42,12.401z"></path><linearGradient id="hbE9Evnj3wAjjA2RX0We2b_OZuepOQd0omj_gr2" x1="27.373" x2="40.507" y1="27.373" y2="40.507" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#a8142e"></stop><stop offset=".179" stop-color="#ba1632"></stop><stop offset=".243" stop-color="#c21734"></stop></linearGradient><path fill="url(#hbE9Evnj3wAjjA2RX0We2b_OZuepOQd0omj_gr2)" d="M24,30.821L35.599,42.42c0.774,0.774,2.028,0.774,2.802,0l4.019-4.019	c0.774-0.774,0.774-2.028,0-2.802L30.821,24L24,30.821z"></path>
                    </svg>
                </button>
                
                {/* BOTÓN PARA AÑADIR FAVORITO pd: en className, solo añade el remove del final si está en favoritos*/}
                <button type="button" className={`${styles.favoriteButton} ${favourites.some((fav) => fav.id === comic.id) ? styles.remove : ''}`} onClick={toggleFavourite}>
                        {favourites.some((fav) => fav.id === comic.id) ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
                </button>



                {/* INFO COMIC */}
                <h2>{comic.title}</h2>
                <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    className={styles.comicImage}
                />
                <p><strong>Descripción:</strong> {comic.description || "No hay descripción disponible."}</p>
                <p><strong>Número de páginas:</strong> {comic.pageCount}</p>
                <p><strong>Fecha de modificación:</strong>{isNaN(new Date(comic.modified)) ? "No disponible" : new Date(comic.modified).toLocaleDateString('es-ES', {year:'numeric', month:'numeric', day:'numeric'})} </p>
                <p><strong>Series:</strong> {comic.series.name}</p>
                <p><strong>Precio:</strong> {comic.prices[0].price ? `${comic.prices[0].price}$` : "No disponible"}</p>

                {/* SECCIÓN PERSONAJES */}
                <div className={styles.characterSection}>
                    <h3>Personajes:</h3>
                    {comic.characters?.items?.length > 0 ? (
                        <div className={styles.charactersContainer}>
                            {comic.characters.items.map((character) => (
                                <InfoCharacter
                                    key={character.resourceURI}
                                    characterID={character.resourceURI}
                                /> 
                            ))}
                        </div>
                    ) : (
                        <p>No hay personajes disponibles para este cómic.</p>
                    )}
                </div>
            </div>
        </div>
    );
};


