import React, { Fragment } from "react";
import MoreButton from "../components/MoreButton";
import Sushi from "../components/Sushi";

const SushiContainer = props => {
  return (
    <Fragment>
      <div className="belt">
        {props.sushi.map(sushiObj => (
          <Sushi
            key={sushiObj.id}
            sushi={sushiObj}
            consumeSushi={props.consumeSushi}
          />
        ))}
        <MoreButton showNextRound={props.showNextRound} />
      </div>
    </Fragment>
  );
};

export default SushiContainer;
