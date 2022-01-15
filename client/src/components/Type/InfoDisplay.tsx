import * as React from 'react';
import { GitFileInfo } from '../../interfaces';
import './InfoDisplay.css';
import { Socials } from '../LanguagePicker/Socials';

export const InfoDisplay: React.FC<{
  chunks: number,
  fileInfo: GitFileInfo,
  round: number
  cpm: number,
  acc: number,
  wpm: number
}> = ({ chunks, fileInfo, cpm, acc, wpm, round }) => {
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

      <div>
        <div>
          <div className='title stat'>Test:&nbsp;</div>
          <div>{round}</div>
        </div>
        <div>
          <div className='title stat'>Parts:&nbsp;</div>
          <div>{chunks}</div>
        </div>
        <div>
          <div className='title stat'>WPM:&nbsp;</div>
          <div>{wpm}</div>
        </div>
        <div>
          <div className='title stat'>CPM:&nbsp;</div>
          <div>{cpm}</div>
        </div>
        <div>
          <div className='title stat'>ACC:&nbsp;</div>
          <div>
            {acc}%
          </div>
        </div>
      </div>
      <Socials />
    </div>
  );
}