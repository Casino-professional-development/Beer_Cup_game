import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import logo from '../../image/logo.svg';
import arrowRight from '../../image/arrowright.png';

const Left = () => {
  const [likeCount] = useState(0);
  const [unlikeCount] = useState(0);
  const [commentCount] = useState(0);
  const [flag, setFlag] = useState(true);

  const slideCick = () => {
    setFlag(!flag)
  }

  return (
    <div className='dashboard-left' >
      <div className='left-slide-control' >
        <div className='top'>
          <div className='logo'>
            <img src={logo} alt='logo' />
          </div>
        </div>
        <div className='left-slide' onClick={ () => slideCick()}>
          <div className='left-slide-button'>
            <img src={arrowRight} alt='arrowRight' style={{
              transform: flag ? "rotate(180deg)" : "rotate(0deg)"
            }}  />
          </div>
        </div>
      </div>
      <div className='left-slide-container' style={ flag 
        ? { width: "0px", padding: "0px" } 
        : { width: "500px", padding: "24px" }
      }>
        <div className='left-slide-container-item1'>
          <div className='left-slide-container-item1-button1'>
            <span>&#8592;</span>
            <span>Exit game</span>
          </div>
          <div className='left-slide-container-item1-button2'>
            <div className='like'>       
              <FontAwesomeIcon className='icon' icon={faThumbsUp} />
              <p>{likeCount}</p>        
            </div>
            <div className='unlike'>
              <FontAwesomeIcon className='icon' icon={faThumbsDown} />
              <p>{unlikeCount}</p>
            </div>
          </div>
        </div>
        <div className='left-slide-container-item2'>
          <div className='left-casino'>
            <p>Play in Casino</p>
          </div>
        </div>
        <div className='left-slide-container-item3'>
          <div className='left-list'>
            <p>My List</p>
          </div>
          <div className='left-list'>
            <p>{commentCount}</p>
            <p>Comments</p>
          </div>
          <div className='left-list'>
            <p>Report a problem</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Left;