import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LevelBoard from '../components/LevelBoard';

const App = () => {
  const [gridItems, setGridItems] = useState([]);

  useEffect(async () => {
    let response = await axios.get('/api/v1/levels');
    if (response.data) {
      let responseItems = [];
      response.data.data.forEach((level) => {
        responseItems.push(
          <LevelBoard
            key={level.id}
            id={level.id}
            img={level.attributes.image_url}
            title={level.attributes.name}
            btnText="Play"
            btnLink="levels"
            gridItemBg="bg-red"
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

export default App;
