import React, { useEffect, useState } from "react";
import { fetchAllStages, fetchAllSequences} from "../hooks/useDb";
// import EtapeBlue from './../assets/images/etapes/EtapeBlue.svg'
// import Etape from "../components/Etape";
// import EtapeContent from "../components/EtapeContent";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {CircleLoader} from 'react-spinners';
import MainHeader from '../components/MainHeader';
import arrowRight from '../assets/images/arrow.png';
import { IoMdArrowDropright } from "react-icons/io";
import EtapeContent from "../components/EtapeContent";



const Etapes = (props) => {


  const { db } = props

  const [etapes, setEtapes] = useState([]);
  const [sequences, setSequences] = useState([]);
  // const [seqById, setSeqById] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  fetchAllStages(db);
  fetchAllSequences(db);

  const theme = createTheme({
    components: {
      MuiAccordion: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            border: 'none',
            '&:before': {
              display: 'none',
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    const loadStages = async () => {
      setIsLoading(true)
      const loadedStages = await fetchAllStages(db);
      setEtapes(loadedStages);
      setIsLoading(false);
    };

    const loadSequences = async () => {
      const loadedSequences = await fetchAllSequences(db);
      console.log(loadedSequences);
      setSequences(loadedSequences);
    }
    loadStages();
    loadSequences();
    // console.log(etapes);
    // console.log(sequences)
  }, []);


  return <>


      {
        isLoading ? (
          <CircleLoader color="#36d7b7" size={150} cssOverride={{margin: '20% auto 0 auto'}}/>
        ) : (
          <>
            <MainHeader role="user" link="/home"/>
            {etapes.length ? (
              etapes.map((stage) => {
                return (
                  <ThemeProvider theme={theme} key={stage.stage_id}>
                    <Accordion style={{ border: 'none' }}>
                      <AccordionSummary
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography className="Etape">
                          <button className="Etape__accordion"></button>
                          {/* <img className="Etape__img" src={EtapeBlue} alt="Etape" /> */}
                          <div className="Etape__Title">
                            <h2>{stage.sta_name}</h2>
                            <Link to={`/etape/${stage.stage_id}`}>
                              <IoMdArrowDropright size={55} color="#FFF"/>
                            </Link>
                          </div>
                          <div className="Etape__container"></div>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography className="Etape__container">
                        {sequences.filter((sequence) => sequence.stage.id === stage.id)
                                .map((s, index) => {
                                  // console.log('la sequence ', sequences)
                                  return  <Link to={`${s.id}`} key={index}>
                                     
                                              {/* <p className="Etape__content">{s.seq_title.replace(/-/g, '')}</p> */}

                                                <EtapeContent content={s.seq_title.toUpperCase().replace(/-/g, "   ")} />
                                              
                                      </Link>
                                })}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </ThemeProvider>
                );
              })
            ) : (
              <p>Aucune étape enregistrée pour le moment</p>
            )}
          </>
        )
      }


  </>


}

export default Etapes;
