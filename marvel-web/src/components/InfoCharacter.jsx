import React, { useEffect } from 'react';
import {fetchInfo } from '../utils/marvelApi';
import {useState} from 'react';
import styles from '../styles/InfoCharacter.module.css'; 

export default function InfoCharacter({characterID}){

    const [pCharacter, setPCharacter] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () =>{
        setIsModalOpen(!isModalOpen);
    };

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
        console.log(takeId(characterID));
    }, []);
    
    return(
        <>
        <div className={styles.characterContainer} onClick={toggleModal}>
            {pCharacter && <p className={styles.characterName}>{pCharacter.name}</p>}
            {pCharacter && (
                <img
                    src={`${pCharacter.thumbnail.path}.${pCharacter.thumbnail.extension}`}
                    alt={pCharacter.name}
                    className={styles.characterThumbnail}
                />
            )}
        </div>

        {isModalOpen && (
            <div className={styles.modalBackground} onClick={toggleModal}>
                <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={toggleModal} >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                        <linearGradient id="hbE9Evnj3wAjjA2RX0We2a_OZuepOQd0omj_gr1" x1="7.534" x2="27.557" y1="7.534" y2="27.557" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f44f5a"></stop><stop offset=".443" stop-color="#ee3d4a"></stop><stop offset="1" stop-color="#e52030"></stop></linearGradient><path fill="url(#hbE9Evnj3wAjjA2RX0We2a_OZuepOQd0omj_gr1)" d="M42.42,12.401c0.774-0.774,0.774-2.028,0-2.802L38.401,5.58c-0.774-0.774-2.028-0.774-2.802,0	L24,17.179L12.401,5.58c-0.774-0.774-2.028-0.774-2.802,0L5.58,9.599c-0.774,0.774-0.774,2.028,0,2.802L17.179,24L5.58,35.599	c-0.774,0.774-0.774,2.028,0,2.802l4.019,4.019c0.774,0.774,2.028,0.774,2.802,0L42.42,12.401z"></path><linearGradient id="hbE9Evnj3wAjjA2RX0We2b_OZuepOQd0omj_gr2" x1="27.373" x2="40.507" y1="27.373" y2="40.507" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#a8142e"></stop><stop offset=".179" stop-color="#ba1632"></stop><stop offset=".243" stop-color="#c21734"></stop></linearGradient><path fill="url(#hbE9Evnj3wAjjA2RX0We2b_OZuepOQd0omj_gr2)" d="M24,30.821L35.599,42.42c0.774,0.774,2.028,0.774,2.802,0l4.019-4.019	c0.774-0.774,0.774-2.028,0-2.802L30.821,24L24,30.821z"></path>
                        </svg>
                    </button>

                    <h2>{pCharacter.name}</h2>
                    <img
                        src={`${pCharacter.thumbnail.path}.${pCharacter.thumbnail.extension}`}
                        alt={pCharacter.name}
                        className={styles.modalCharacterImage}
                    />
                    <p><strong>Descripción:</strong> {pCharacter.description || 'Descripción no disponible.'}</p>
                    <p><strong>Series:</strong> {pCharacter.series.name}</p>
                    <p><strong>Comics en los que aparece:</strong> {pCharacter.comics.available}</p>
                    <p><strong>Historias:</strong> {pCharacter.stories.available}</p>
                </div>
            </div>
        )}
 
    </>
    )
}