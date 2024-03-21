import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { fetchAllExerciceForSequences, fetchOneSequence } from "../hooks/useDb";
import { Box, Modal, Typography } from "@mui/material";
import Button from "../components/Button";
import videoCam from '../assets/images/camera.svg'
import imgEtape from '../assets/images/layoutexercices/etape.png';

//Import des différentes coupes
import argentMedal from '../assets/gamification/médaille=argent.png';
import bronzeMedal from '../assets/gamification/médaille=bronze.png';
import orMedal from '../assets/gamification/médaille=or.png';

const SequenceHome = ({ db }) => {

    const params = useParams();
    const id = params?.sequence;
    // Convertir sequenceId en entier
    const idSeq = parseInt(id, 10);

    const [sequence, setSequence] = useState();
    const [exercises, setExercises] = useState([]);
    const [open, setOpen] = useState(false);
    const videoSrc = `/video/SEQUENCE ${encodeURIComponent(id - 1)}.mp4`;
    console.log(videoSrc)


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {

        const loadSequences = async () => {

            const loadedSequences = await fetchOneSequence(idSeq);
            setSequence(loadedSequences);
            console.log('les stages =====> ', loadedSequences)
        };

        const loadExercises = async () => {
            try {
                const exercisesList = await fetchAllExerciceForSequences(idSeq);
                const sortedExercises = exercisesList.sort((a, b) => a.order - b.order);
                console.log(exercisesList);
                setExercises(sortedExercises);
            } catch (error) {
                console.error("Erreur lors du chargement des exercices :", error);
            }
        };



        loadExercises();
        console.log(exercises);
        loadSequences();
    }, [db, idSeq]);

    useEffect(() => {
        setOpen(true);
        console.log(sequence)
    }, [])



    const handleCloseModal = () => {
        setOpen(false);
    };


    return <div className="sequence">
        {process.env.REACT_APP_NAME_VARIABLE}
        <header className="header">
            <div className="header__title">

                <div className="header__etape">
                    <img src={imgEtape} alt="" />
                    <p>Etape {sequence && sequence.map((s, index) => (
                        <span key={index}>{s.stage_id}{index < sequence.length - 1 && ', '}</span>
                    ))}</p>
                </div>
                <p className="header__sequence">{sequence?.title}</p>
            </div>

            <div className="header__percent">
                <p>0 %</p>
                <img src={argentMedal} alt="medaille" />
            </div>

            <div className="header__actions">
                <img src={videoCam} alt="Video Cam" onClick={() => setOpen(true)} />
            </div>
        </header>
        <main className="exercises">
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <video style={{ width: "40vw" }} src={videoSrc} controls autoPlay />
                    </Typography>
                </Box>
            </Modal>
            <ul className="exercises__list">
                {exercises.map((el, index) => {
                    return <li className="exercises__item" key={index}>
                        <div className="progress">

                        </div>
                        <p className="consigne">{el.exo_consigne}</p>
                    </li>
                })}
            </ul>

            <Link to="exo"><div className="exercises__start">Commencer</div></Link>
            <Outlet />
        </main>
    </div>

}

export default SequenceHome;
