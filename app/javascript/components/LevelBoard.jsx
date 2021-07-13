import React from 'react';
import { Link } from 'react-router-dom';

const LevelBoard = (props) => {
  return (
    <div className={`grid-item level-board ${props.gridItemBg}`}>
      <div className="grid-img-container">
        <img src={props.img} alt="" />
      </div>
      <div className="grid-title">
        <h2>{props.title}</h2>
      </div>
      <div className="grid-btn">
				<Link to={`/${props.btnLink}/1`} className='btn btn-default'>
					{props.btnText}
				</Link>
      </div>
    </div>
  );
};

export default LevelBoard;
