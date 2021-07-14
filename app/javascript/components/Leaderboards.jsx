// TODO: Since both are getting data from the api via levels#index, merge with App.jsx maybe?? (and just pass some props for the changes)

import React, { useState, useEffect } from 'react';
import LevelBoard from './LevelBoard';
import axios from 'axios';

const Leaderboards = () => {
  const [gridItems, setGridItems] = useState([]);

  useEffect(async () => {
    let response = await axios.get('/api/v1/levels');
    if (response.data) {
      let responseItems = [];
      response.data.data.forEach((level) => {
        responseItems.push(
          <LevelBoard
            key={level.attributes.leaderboard_id}
            id={level.attributes.leaderboard_id}
            img={level.attributes.image_url}
            title={level.attributes.name}
            btnText="View"
            btnLink="leaderboards"
            gridItemBg="bg-yellow"
          />
        );
      });
      setGridItems(responseItems);
    }
  }, []);

  return (
    <div>
      <div className="container">{gridItems}</div>
    </div>
  );
};

export default Leaderboards;
