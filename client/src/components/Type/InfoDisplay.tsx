import * as React from 'react';
import { GitFileInfo } from '../../interfaces';
import './InfoDisplay.css';

export const InfoDisplay: React.FC<{
  fileInfo: GitFileInfo,
  totalCharacterCount: number,
  characterCount: number,
  wrongCount: number
}> = ({ fileInfo, characterCount, totalCharacterCount, wrongCount }) => {
  const totalSeconds = React.useRef<number>(1);
  const totalMinutes = React.useRef<number>(1);
  // console.log('Character Count:', characterCount);
  // console.log('Wrong Count:', wrongCount);

  React.useEffect(() => {
    const secondInterval = setInterval(() => { totalSeconds.current += 1 }, 1000);
    const minuteInterval = setInterval(() => { totalMinutes.current += 1 }, 60000);

    return () => {
      // console.log('Unmount the Info');
      clearInterval(secondInterval);
      clearInterval(minuteInterval);
    }
  }, []);
  
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
          <div className='title stat'>WPM:&nbsp;</div>
          <div>{Math.floor((characterCount / 5) / totalMinutes.current)}</div>
        </div>
        <div>
          <div className='title stat'>CPM:&nbsp;</div>
          <div>{Math.floor(characterCount / totalMinutes.current)}</div>
        </div>
        <div>
          <div className='title stat'>ACC:&nbsp;</div>
          <div>
            {
              (characterCount > 0)
              ? Math.round((characterCount - wrongCount) / characterCount * 100)
              : 100
            }%
          </div>
        </div>
      </div>
    </div>
  );
}