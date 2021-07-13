// TODO: Should probably save img name in level database and fetch via api
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LevelBoard from '../components/LevelBoard';

const App = () => {
  const [ gridItems, setGridItems ] = useState([]);

  useEffect(async () => {
    let response = await axios.get('/api/v1/levels');
    if (response.data) {
      response.data.data.forEach((level) => {
        setGridItems([
          ...gridItems,
          <LevelBoard
						key={level.id}
            img={level.attributes.image_url}
            title={level.attributes.name}
            btnText="Play"
            btnLink="levels"
            gridItemBg="bg-red"
          />,
        ]);
      });
    }
  }, []);

  return (
    <div>
      <div className="container">
				{gridItems}
      </div>
    </div>
  );
};

export default App;
