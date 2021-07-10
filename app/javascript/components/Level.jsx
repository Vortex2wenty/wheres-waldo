import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Level = (props) => {
  const popup = useRef(null);
  const { level } = useParams();
  const [popupActive, setPopupActive] = useState(true);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [displayTime, setDisplayTime] = useState();

  useEffect(async () => {
    let request = await axios.get(`/api/v1/levels/${level}`);
    console.log(request.data);
    let leaderboard_id = request.data.data.attributes.leaderboard_id;
    let dateNow = Date.now();
    axios.post('/api/v1/players', {
      "start_time": dateNow,
      leaderboard_id
    });
    setStartTime(dateNow);
  }, []);


  useEffect(() => {
    setTimeout(() => {
      let diff = Math.abs(Date.now() - startTime);

      let ms = diff % 1000;
      diff = (diff - ms) / 1000;
      let ss = diff % 60;
      diff = (diff - ss) / 60;
      let mm = diff % 60;
      diff = (diff - mm) / 60;
      let hh = diff % 24;

      setDisplayTime(`${hh < 10 ? '0' + hh : hh}:${mm < 10 ? '0' + mm : mm}:${ss < 10 ? '0' + ss : ss}`);
    }, 1000);
  });

  const imgClick = (e) => {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.

    const characterClick = (e) => {
      e.preventDefault();
      axios.get(`/api/v1/validate/${level}`, {
        params: {
          validate: {
            char_locations: {
              [e.target.textContent.toLowerCase()]: [+Math.round(x), +Math.round(y)]
            }  
          }
        }
      })
      .then((response) => {
        if (response.data.win) {
          console.log('You won!')
          // toggleLeaderboardPopup();
        } else if (response.data.validate) {
          console.log('Char hit!')
          // placeMarker(x, y);
        } else {
          console.log('No chars hit!')
        }
      })
      .catch((err) => {
        console.log(err);
      })
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

  return (
    <div>
      <div className="grid-item level-board">
        <div className="grid-img-container">
          <img
            src={props.img}
            alt=""
            onClick={imgClick}
            style={{ width: '1000px', height: 'auto' }}
          />
          <ul className="popup-menu" ref={popup}>
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
        <div className="grid-title">
          <h2>Time - {displayTime}</h2>
        </div>
      </div>
    </div>
  );
};

export default Level;
