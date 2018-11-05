import React, { Fragment } from "react";

const Sushi = ({ sushi, consumeSushi }) => {
  //debugger
  return (
    <div onClick={event => consumeSushi(sushi)} className="sushi">
      <div className="plate">
        {sushi.eaten ? null : <img src={sushi.img_url} width="100%" />}
      </div>
      <h4 className="sushi-details">
        {sushi.name} - ${sushi.price}
      </h4>
    </div>
  );
};

export default Sushi;
