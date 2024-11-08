import './App.css';
import {fetchInfo } from './utils/marvelApi';
import {useState, useEffect} from 'react';
import ComicList from './components/ComicList';
import ComicDetail from './components/ComicDetail';
import FavouriteSidebar from './components/FavouriteSidebar';

export default function App () {
    const [comics, setComics] = useState([]);
    const [selectedComic, setSelectedComic] = useState(null); 
    const [showModal, setShowModal] = useState(false); 
    const [loading, setLoading] = useState(false);

    const [isSidebarVisible, setSideBarVisible] = useState(false);
    const [favourites, setFavourites] = useState(() =>{
        return JSON.parse(localStorage.getItem('favouriteComics')) || [];
    });

    useEffect(() => {
        const getComics = async () => {
            const comicData = await fetchInfo('comics');
            setComics(comicData);
        };
        getComics();
    }, []);

    //añadir comic a favoritos
    useEffect(()=>{
        localStorage.setItem('favouriteComics', JSON.stringify(favourites));
    }, [favourites]);


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

    const toggleSideBar = () =>{
        setSideBarVisible(!isSidebarVisible);
    };

    const handleFavourites = (comic) =>{
        if(!favourites.some((fav) => fav.id === comic.id)){  
            setFavourites([...favourites, comic]);
        }   
        else{
            setFavourites(favourites.filter((fav) => fav.id !== comic.id));
        }
    };


    return (
        <div>
            <h1 className='title'>Marvel Comics</h1>
            <ComicList comics={comics} onSelectComic={handleSelectComic} />

  
            <FavouriteSidebar 
                onSelectComic={handleSelectComic} 
                favourites={favourites}
                isVisible={isSidebarVisible}
                toggleSidebar={toggleSideBar}
                handleFavourites={handleFavourites}
            />

            {loading && (
                <div className="spinner-overlay">
                    <div className="spinner"></div>
                </div>
            )}

            {showModal && !loading && (<ComicDetail comic={selectedComic} onClose={closeModal} handleFavourite={handleFavourites} favourites={favourites}/>)}
        </div>
    );
};

