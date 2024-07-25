// import React, { useEffect, useState } from "react";
// import MainHeader from "./MainHeader";
// import { fetchAllSequences } from "../hooks/useDb";
// import { Link, useParams } from "react-router-dom";
// import medailleArgent from '../assets/gamification/medailleArgent.png';
// import { CircleLoader } from "react-spinners";

// const Etape = (props) => {
//     const { db } = props;
//     const params = useParams();
//     const idStage = params.etape;
//     const [sequences, setSequences] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         const loadSequences = async () => {
//             setIsLoading(true);
//             try {
//                 const loadedSequences = await fetchAllSequences(db);
//                 if (loadedSequences) {
//                     setSequences(loadedSequences.filter((sequence) => sequence.stageId === parseInt(idStage, 10)));
//                 }
//             } catch (error) {
//                 console.error("Erreur lors du chargement des séquences :", error);
//             }
//             setIsLoading(false);
//         };

//         loadSequences();
//     }, [db, idStage]);

//     return (
//         <React.Fragment>
//             <MainHeader role={"user"} link={"/etapes"} />
//             <main>
//                 {isLoading ? (
//                     <CircleLoader color="#36d7b7" size={150} cssOverride={{ margin: '20% auto 0 auto' }} />
//                 ) : (
//                     <div className="etape">
//                         {/* {sequences && sequences.length > 0 ? (
                            
//                             sequences.map((sequence) => (
//                                 <div className="sequenceGroup" key={sequence.sequenceId}>
//                                     <Link to={`/etapes/${sequence.sequenceId}`} className="sequenceGroup__seq">
//                                         <div className="sequenceGroup__content">
//                                             {sequence.title}
//                                         </div>
//                                     </Link>
//                                     <img className="sequenceGroup__recompense" src={medailleArgent} alt="medaille" />
//                                 </div>
//                             ))
//                         ) 
//                         : (
//                             <p>Aucune séquence trouvée.</p>
//                         )} */}
//                         <Link to="/" className="etape__bilan">
//                             <p className="sequenceGroup__content">Bilan</p>
//                             <img className="etape__imgBilan" src="img/medaillesCoupes/coupe=argent.png" alt="coupe" />
//                         </Link>
//                     </div>
//                 )}
//             </main>
//         </React.Fragment>
//     );
// };

// export default Etape;
