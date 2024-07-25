import { useState } from "react";
import Water from "../components/water";

const EtapeContent = (props) => {
    const { content, progress, sequenceId } = props;

    return (
        <div className={`Etape__seq water-${sequenceId}`}>
            <Water scorePercentage={progress/100} sequenceId={sequenceId} />
            <span className="Etape__content">{content}</span>
        </div>
    );
};

export default EtapeContent;
