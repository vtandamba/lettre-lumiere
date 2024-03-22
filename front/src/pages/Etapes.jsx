import React, { useEffect, useState } from "react";
import { fetchAllStages, fetchAllSequences, fetchSeqByStageId } from "../hooks/useDb";
import EtapeBlue from './../assets/images/etapes/EtapeBlue.svg'
import Etape from "../components/Etape";
import EtapeContent from "../components/EtapeContent";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";



const Etapes = (props) => {


  const { db } = props

  const [etapes, setEtapes] = useState([]);
  const [sequences, setSequences] = useState([]);
  const [seqById, setSeqById] = useState([]);

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
      const loadedStages = await fetchAllStages(db);
      console.log(loadedStages);
      setEtapes(loadedStages);
    };
    const loadSequences = async () => {
      const loadedSequences = await fetchAllSequences(db);
      console.log(loadedSequences);
      setSequences(loadedSequences);
    }
    loadStages();
    loadSequences();
    console.log(etapes);
    console.log(sequences)
  }, []);


  return <>

    {etapes?.map((stage) => {
      return <ThemeProvider theme={theme}>
        <Accordion style={{ border: 'none' }}>
          <AccordionSummary
            // expandIcon={<MdArrowDropDown size={40} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography className="Etape">
                <button className="Etape__accordion"></button>
                <img className="Etape__img" src={EtapeBlue} alt="Etape" />

                <h2 className="Etape__Title">{stage.sta_name}</h2>
                <div className="Etape__container">

                </div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="Etape__container">
              {sequences.filter((sequence) => sequence.stage_id === stage.stage_id)
                .map((s) => {
                  console.log('la sequence ', sequences)
                  return <Link to={`${s.sequence_id}`}><EtapeContent content={s.seq_title.toUpperCase().replace(/-/g, "   ")} /></Link>
                })}

            </Typography>
          </AccordionDetails>
        </Accordion>
      </ThemeProvider>

    })}


  </>


}

export default Etapes;
