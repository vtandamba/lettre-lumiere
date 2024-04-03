import React, { useEffect, useState } from "react"
import EtapeContent from "./EtapeContent";
import MainHeader from "./MainHeader";
import { fetchAllSequences } from "../hooks/useDb";
import { Link, useParams } from "react-router-dom";
import medailleArgent from '../assets/gamification/medailleArgent.png'
import { CircleLoader } from "react-spinners";
const Etape = (props) => {

    const { db } = props;
    const params = useParams();
    const idStage = params.etape;
    console.log(parseInt(idStage, 10) === 1)
    const [sequences, setSequences] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log(sequences[3]?.seq_content);


    useEffect(() => {

        const loadSequences = async () => {
            setIsLoading(true);
            const loadedSequences = await fetchAllSequences(db);
            setIsLoading(false);
            console.log(loadedSequences);
            setSequences(loadedSequences.filter((sequence) => sequence.stage_id === parseInt(idStage, 10)));
        }

        loadSequences();

    }, [])
    // sequences.map(el => {
    //     console.log('itération',JSON.parse(el.seq_content));
    //     return  JSON.parse(el?.seq_content).map(el => console.log (el))
    // });
    return <React.Fragment>
        <MainHeader
            role={"user"}
            link={"/etapes"}
        />
        <main>

            {
                isLoading ? (
                    <CircleLoader color="#36d7b7" size={150} cssOverride={{margin: '20% auto 0 auto'}}/>
                ) :
                (
                    <div class="etape">
                    {sequences.map((sequence) => {
                        return <div class="sequenceGroup">
                            <Link to={`/etapes/${sequence.sequence_id}`} class="sequenceGroup__seq">
                                <div class="sequenceGroup__content">
                                {sequence.seq_content && Array.isArray(JSON.parse(sequence.seq_content)) && JSON.parse(sequence.seq_content).map(el => <p>{el}</p>)}
    
                                </div>
                            </Link>
                            <img class="sequenceGroup__recompense" src={medailleArgent} alt="medaille" />
                        </div>
                    })}
    
    
                    <Link to="/" class="etape__bilan">
    
                        <p class="sequenceGroup__content">Bilan </p>
                        <img class="etape__imgBilan" src="img/medaillesCoupes/coupe=argent.png" alt="coupe" />
    
                    </Link>
    
                </div>
                )
            }
         

        </main>

    </React.Fragment>

}
export default Etape