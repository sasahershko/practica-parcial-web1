import React, { useEffect } from 'react';
import {fetchInfo } from '../utils/marvelApi';
import {useState} from 'react';

export default function InfoCharacter({character, characterID}){

    const [pCharacter, setPCharacter] = useState(null);
    
    const takeId = (characterID) =>{
        const id = characterID.split('/');
        return id[id.length - 1];
    }

    useEffect(() => {
        const getCharacter = async() =>{
            const characterData = await fetchInfo('characters/' + takeId(characterID));
            setPCharacter(characterData);
        };
        getCharacter();
    }, []);
    
    return(
        <div>
            {pCharacter && <p>{pCharacter.name}</p>}
            {pCharacter && <img src={`${pCharacter.thumbnail.path}.${pCharacter.thumbnail.extension}`} alt={pCharacter.name}/>}
            
        </div>
    )
}