import styles from '../styles/ComicDetail.module.css'

export default function ComicDetail({comic, onClose}){

    if(!comic) return null;


    return(
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}> 
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <h1>{comic.title}</h1>
                <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} className={styles.comicImage}/>

                <p><strong>Descripción: </strong> {comic.description || "No hay descripción"}</p>
                <p><strong>Número de páginas: </strong> {comic.pageCount}</p>
                <p><strong>Fecha de publicación: </strong>{comic.dates.find(date=> date.type === "onsaleDAte")?.date.slice(0,10)}</p>
                <p><strong>Series: </strong>{comic.series.name}</p>
            </div>
        </div>
    )
}