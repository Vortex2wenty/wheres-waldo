import React from 'react';
import CheckmarkSVG from 'images/check-circle.svg';

const Checkmark = (props) => {
	return (
		<img src={CheckmarkSVG} style={{ position: 'absolute', left: props.x, top: props.y }} />
	);
};

export default Checkmark;