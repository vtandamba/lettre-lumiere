const EtapeContent = (props) => {

    const {
        content
    } = props

    return <>


        <p  className="Etape__seq">
            <span className="Etape__content">{content}</span>
        </p>


    </>

}
export default EtapeContent