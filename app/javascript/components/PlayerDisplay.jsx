import React, { useState, useEffect } from 'react';

const PlayerDisplay = (props) => {
  const [ displayTime, setDisplayTime ] = useState();

  useEffect(() => {
      let diff = props.time;

      let ms = diff % 1000;
      diff = (diff - ms) / 1000;
      let ss = diff % 60;
      diff = (diff - ss) / 60;
      let mm = diff % 60;
      diff = (diff - mm) / 60;
      let hh = diff % 24;

      setDisplayTime(
        `${hh < 10 ? '0' + hh : hh}:${mm < 10 ? '0' + mm : mm}:${
          ss < 10 ? '0' + ss : ss
        }`
      );
  }, []);

  return (
    <div className="flex-item flex-container player-display">
      <div className="flex-item">
        <h2>{props.index}. {props.player_name ? props.player_name : 'Anonymous'}</h2>
      </div>
			<div className="flex-item">
        <h2>{displayTime}</h2>
      </div>
    </div>
  );
};

export default PlayerDisplay;