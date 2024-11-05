// src/components/ComicDetail.jsx
import React from 'react';
import styles from '../styles/ComicDetail.module.css'; // Importación correcta para CSS Module

export default function ComicDetail ({ comic, onClose }) {
    if (!comic) return null; // Si no hay cómic seleccionado, no muestra nada

    return (
        <div className={styles.modalBackground} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <h2>{comic.title}</h2>
                <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    className={styles.comicImage}
                />
                <p><strong>Descripción:</strong> {comic.description || "No hay descripción disponible."}</p>
                <p><strong>Número de páginas:</strong> {comic.pageCount}</p>
                <p><strong>Fecha de publicación:</strong> {comic.dates.find(date => date.type === "onsaleDate")?.date.slice(0, 10)}</p>
                <p><strong>Series:</strong> {comic.series.name}</p>
            </div>
        </div>
    );
};


