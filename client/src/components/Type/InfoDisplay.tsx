import * as React from 'react';
import { GitFileInfo } from '../../interfaces';
import './InfoDisplay.css';

export const InfoDisplay: React.FC<{
  fileInfo: GitFileInfo
}> = ({ fileInfo }) => {
  return (
    <div id='infoContainer'>
      <div>
        <div>
          <div className='avatar'>
            <img src={fileInfo.owner.avatar_url} alt='Github Avatar'/> 
          </div>
        </div>

        <div>
          <div className='title'>Repository &nbsp;&nbsp;</div>
          <div><a href={fileInfo.html_url} target='_blank' rel='noreferrer'>{ fileInfo.repo_name }</a></div>
        </div>

        <div>
          <div className='title'>Path &nbsp;&nbsp;</div>
          <div><a href={fileInfo.url} target='_blank' rel='noreferrer'>{ fileInfo.path }</a></div>
        </div>
      </div>
    </div>
  );
}