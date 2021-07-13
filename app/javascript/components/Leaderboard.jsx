import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PlayerDisplay from '../components/PlayerDisplay';

const Leaderboard = () => {
  const { leaderboard } = useParams();
  const [leaderboardName, setLeaderboardName] = useState();
  const [ playerDisplays, setPlayerDisplays ] = useState([]);

  useEffect(async () => {
    let leaderboardResponse = await axios.get(
      `/api/v1/leaderboards/${leaderboard}`
    );
    if (leaderboardResponse.data) {
      const level_id = leaderboardResponse.data.data.attributes.level_id;
      let levelResponse = await axios.get(`/api/v1/levels/${level_id}`);
      if (levelResponse.data) {
        setLeaderboardName(levelResponse.data.data.attributes.name);
      }
    }
  }, []);

  useEffect(async () => {
    let leaderboardResponse = await axios.get(
      `/api/v1/leaderboards/${leaderboard}`
    );
    if (leaderboardResponse.data) {
      let players = leaderboardResponse.data.included.sort((a, b) =>
        a.attributes.time_diff > b.attributes.time_diff ? 1 : b.attributes.time_diff > a.attributes.time_diff ? -1 : 0
      );
			let playersMapped = players.map((playerData, index) => {
				console.log(playerData);
				return <PlayerDisplay key={playerData.id} index={index + 1} player_name={playerData.attributes.name} time={playerData.attributes.time_diff} />
			});
			setPlayerDisplays(playersMapped);
    }
  }, []);

  return (
    <div>
      <div className="grid-item leaderboard-board">
        <div className="grid-title">
          <h2 className="text-dark">Leaderboard: {leaderboardName}</h2>
        </div>
        <div className="flex-container">{playerDisplays}</div>
      </div>
    </div>
  );
};

export default Leaderboard;
