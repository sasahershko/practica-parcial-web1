import './App.css';
import { fetchComics, fetchSpecificComic } from './utils/marvelApi';
import {useState, useEffect} from 'react';
import ComicList from './components/ComicList'

function App() {

  const [comics, setComics] = useState([]);
  const [selectedComic, setSelectedComic] = useState(null);
  const [favourites, setFavourites] = useState([]);

  useEffect(()=>{
    const getComics = async() =>{
      const comicData = await fetchComics();
      setComics(comicData);
    };

      getComics();
  }, []);

  const handleSelectComic = async (comicId)=>{
    const comic = await fetchSpecificComic(comicId);
    setSelectedComic(comic);
  };

  const handleFavouritesComics = async (comic) =>{
    const updateFavourites = [...favourites, comic];
    setFavourites(updateFavourites);
    localStorage.setItem('favourites', JSON.stringify(updateFavourites));
  };

  return (
    <div className="App">
      <h1>Marvel Comics</h1>
      <ComicList comics={comics}/>
    </div>
  );
}

export default App;
