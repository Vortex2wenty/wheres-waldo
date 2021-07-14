import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Checkmark from './Checkmark';
import axios from 'axios';

const Level = (props) => {
  let history = useHistory();
  const popup = useRef(null);
  const leaderboardPopup = useRef(null);
  const { level } = useParams();
  const [popupActive, setPopupActive] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [displayTime, setDisplayTime] = useState();
  const [playerID, setPlayerID] = useState();
  const [username, setUsername] = useState();
  const [markers, setMarkers] = useState([]);
  const [image, setImage] = useState();

  useEffect(async () => {
    let request = await axios.get(`/api/v1/levels/${level}`);
    setImage(request.data.data.attributes.image_url)
    let leaderboard_id = request.data.data.attributes.leaderboard_id;
    let dateNow = Date.now();
    let response = await axios.post('/api/v1/players', {
      start_time: dateNow,
      leaderboard_id,
    });
    setPlayerID(+response.data.data.id);
    setStartTime(dateNow);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log('endTime: ' + endTime);
      let diff = Math.abs((endTime ? endTime : Date.now()) - startTime);
      console.log('diff: ' + diff);

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
    }, 1000);
  });

  const toggleLeaderboardPopup = () => {
    leaderboardPopup.current.style.display = 'block';
  };

  const placeMarker = (x, y) => {
    setMarkers([...markers, <Checkmark x={x} y={y} />]);
    console.log(markers);
  };

  const imgClick = (e) => {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; //x position within the element.
    let y = e.clientY - rect.top; //y position within the element.
    let { clientX, clientY } = e;

    const characterClick = (e) => {
      e.preventDefault();
      axios
        .get(`/api/v1/validate/${level}`, {
          params: {
            validate: {
              char_locations: {
                [e.target.textContent.toLowerCase()]: [
                  +Math.round(x),
                  +Math.round(y),
                ],
              },
            },
          },
        })
        .then(async (response) => {
          if (response.data.win) {
            console.log('You won!');
            let playerEndTime = await axios.get(`/api/v1/players/${playerID}`);
            playerEndTime = playerEndTime.data.data.attributes.end_time;
            setEndTime(playerEndTime);
            console.log(endTime);
            toggleLeaderboardPopup();
          } else if (response.data.validate) {
            console.log('Char hit!');
            placeMarker(clientX - 5, clientY - 5);
          } else {
            console.log('No chars hit!');
          }
        })
        .catch((err) => {
          console.log(err);
        });
      popup.current.querySelectorAll('a').forEach((anchor) => {
        anchor.removeEventListener('click', characterClick);
      });
      popup.current.style.display = 'none';
      setPopupActive(false);
    };

    if (popupActive) {
      popup.current.style.display = 'none';
      setPopupActive(false);
    } else {
      popup.current.style.display = 'inline-block';
      popup.current.style.top = y + 'px';
      popup.current.style.left = x + 'px';

      popup.current.querySelectorAll('a').forEach((anchor) => {
        anchor.addEventListener('click', characterClick);
      });

      setPopupActive(true);
    }
    console.log('Left? : ' + x + ' ; Top? : ' + y + '.');
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await axios.patch(`/api/v1/players/${playerID}`, {
      name: username,
    });
    if (response.data) {
      history.push(
        `/leaderboards/${response.data.data.attributes.leaderboard_id}`
      );
    }
  };

  return (
    <div>
      <div className="grid-item level-board">
        <div className="grid-img-container">
          <img
            src={image}
            alt=""
            onClick={imgClick}
            style={{ width: '1000px', height: 'auto' }}
          />
          <ul className="popup-menu" ref={popup} style={{ display: 'none' }}>
            <li>
              <a href="#" data-name="waldo" className="popup-item">
                Waldo
              </a>
            </li>
            <li>
              <a href="#" data-name="wilma" className="popup-item">
                Wilma
              </a>
            </li>
            <li>
              <a href="#" data-name="odlaw" className="popup-item">
                Odlaw
              </a>
            </li>
          </ul>
        </div>
        {markers}
        <div ref={leaderboardPopup} className="modal">
          <div className="modal-content">
            Enter your username:
            <form onSubmit={handleSubmit}>
              <input onChange={handleChange} type="text" name="username" />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <div className="grid-title">
          <h2>Time - {displayTime}</h2>
        </div>
      </div>
    </div>
  );
};

export default Level;
