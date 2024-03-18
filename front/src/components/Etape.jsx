import React from "react"
import EtapeContent from "./EtapeContent"

const Etape = (props) => {

    const {
        EtapeCouleur,
        etapeTitre,

    } = props

    return <>

        <section className="Etape">

            <button className="Etape__accordion"></button>
            <img className="Etape__img" src={EtapeCouleur} alt="Etape" />

            <h1 className="Etape__Title">{etapeTitre}</h1>
            <div className="Etape__container">


            </div>

        </section>


    </>

}
export default Etape