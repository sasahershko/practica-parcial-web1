import './App.css';
import {fetchInfo } from './utils/marvelApi';
import {useState, useEffect} from 'react';
import ComicList from './components/ComicList';
import ComicDetail from './components/ComicDetail';

export default function App () {
    const [comics, setComics] = useState([]);
    const [selectedComic, setSelectedComic] = useState(null); 
    const [showModal, setShowModal] = useState(false); 

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getComics = async () => {
            const comicData = await fetchInfo('comics');
            setComics(comicData);
        };
        getComics();
    }, []);


    const handleSelectComic = async (info) => {
        setLoading(true);
        const comic = await fetchInfo(info); 
        setSelectedComic(comic); 
        setShowModal(true); 
        setLoading(false);
  };
  
    const closeModal = () => {
        //oculto modal
        setShowModal(false); 
        //limpio comic seleccionado
        setSelectedComic(null); 
    };

    return (
        <div>
            <h1 className='title'>Marvel Comics</h1>
            <ComicList comics={comics} onSelectComic={handleSelectComic} />

            {loading && (
                <div className="spinner-overlay">
                    <div className="spinner"></div>
                </div>
            )}

            {showModal && !loading && (<ComicDetail comic={selectedComic} onClose={closeModal} />)}
        </div>
    );
};

