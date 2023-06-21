import React from "react";
import "./scoreCardRanking.css";

function ScoreCardRanking(props) {

    return(
        <div className={props.classNameScoreCardRanking}>
            <div className={props.classNameScoreCardRankingName}>
                <h1>
                    {props.h1ScoreCardPosition}
                </h1>
                &ensp;
                <h1>
                    {props.h1ScoreCardName}
                </h1>
                &ensp;
                <h2>
                    {props.h2ScoreCardTotScore}
                </h2>
            </div>
        </div>
    )
} 

export default ScoreCardRanking