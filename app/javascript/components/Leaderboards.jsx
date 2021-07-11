import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboards = () => {
	return (
		<div>
			<div className="container">
				<LeaderboardBoard />
			</div>
		</div>
	);
};