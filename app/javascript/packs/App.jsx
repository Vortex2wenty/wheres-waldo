// TODO: Should probably save img name in level database and fetch via api
import React from 'react';
import departmentImg from 'images/department-store.jpeg';
import townImg from 'images/in-town.png';
import giantsImg from 'images/the-unfriendly-giants.jpeg';
import starsImg from 'images/when-the-stars-come-out.jpg';
import LevelBoard from '../components/LevelBoard';

const App = () => {
  return (
    <div>
			<div className='container'>
				<LevelBoard img={departmentImg} title='Department Store' />
				<LevelBoard img={townImg} title='In Town' />
				<LevelBoard img={giantsImg} title='The Unfriendly Giants' />
				<LevelBoard img={starsImg} title='When the Stars Come Out'/>
			</div>
    </div>
  );
};

export default App;
