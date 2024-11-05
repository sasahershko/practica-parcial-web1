import './App.css';
import { fetchComics, fetchSpecificComic } from './utils/marvelApi';
import {useState, useEffect} from 'react';
import ComicList from './components/ComicList';
import ComicDetail from './components/ComicDetail';

export default function App () {
    const [comics, setComics] = useState([]);
    const [selectedComic, setSelectedComic] = useState(null); // Estado para el cómic seleccionado
    const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

    useEffect(() => {
        const getComics = async () => {
            const comicData = await fetchComics();
            setComics(comicData);
        };
        getComics();
    }, []);


    const handleSelectComic = async (comicId) => {
      const comic = await fetchSpecificComic(comicId); 
      setSelectedComic(comic); 
      setShowModal(true); 
  };
  

    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false); // Oculta el modal
        setSelectedComic(null); // Limpia el cómic seleccionado
    };

    return (
        <div>
            <h1>Marvel Comics</h1>
            <ComicList comics={comics} onSelectComic={handleSelectComic} />
            {showModal && <ComicDetail comic={selectedComic} onClose={closeModal} />}
        </div>
    );
};

