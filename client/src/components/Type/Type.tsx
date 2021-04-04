import * as React from 'react';
import './Type.css';
import { InfoDisplay } from './InfoDisplay';

import { getRandomContentFromGit } from '../../usecases';
import { contentToChunks } from '../../utils';
import { GitFileInfo, LANGUAGES } from '../../interfaces';
import * as ROUTES from '../../routes';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { useUserValue } from '../../contexts';
import { UserDao } from '../../daos';
import { getACC, getCPM, getWPM } from '../../utils';

const verifyComment = (line: string) => {
  const leftTrimmed = line.trimLeft();
  return leftTrimmed.startsWith('*') || leftTrimmed.startsWith('/*') || leftTrimmed.startsWith('#') || leftTrimmed.startsWith('//');
}

const verifyImport = (line: string) => {
  const leftTrimmed = line.trimLeft();
  return leftTrimmed.startsWith('using') || leftTrimmed.startsWith('"') || leftTrimmed.startsWith('from') || leftTrimmed.startsWith('import') || leftTrimmed.startsWith('package') || leftTrimmed.startsWith('use');
}

const formatContent = (content: string): string[] => {
  let formatted: string[] = [];
  content.split('\n')
    .map((line) => line.trim())
    .filter((line) => !verifyComment(line) && !verifyImport(line))
    .forEach((line) => {
      formatted.push(...line.split(''));
      formatted.push('\n');
    });

  return formatted;
}

const defaultInfo = {
  repo_name: '',
  url: '',
  owner: {
    avatar_url: '',
    login: ''
  },
  html_url: '',
  path: '',
  content: ''
};

export const Type: React.FC<{language: keyof typeof LANGUAGES}> = ({ language }) => {
  const [round, setRound] = React.useState<number>(0);
  const [fileInfo, setFileInfo] = React.useState<GitFileInfo>(defaultInfo);
  const [characterArray, setCharacterArray] = React.useState<string[]>([]);
  const currentIndex = React.useRef<number>(0);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const spanList = React.useRef<Element[]>([]);
  const contentChunks = React.useRef<string[]>([]);
  const wrong = React.useRef<boolean>(false);
  const [characterCount, setCharacterCount] = React.useState<number>(0);
  const [wrongCount, setWrongCount] = React.useState<number>(0);

  const { user } = useUserValue();
  const totalSeconds = React.useRef<number>(1);
  const totalMinutes = React.useRef<number>(1);

  const history = useHistory();

  const loadContent = async () => {
    let content = '';
    let rs;

    if (contentChunks.current.length > 0) {
      content = contentChunks.current.shift()!;
    }
    else {
      // Update then Reset statistics
      if (user) {
        const cpm = getCPM(characterCount, totalMinutes.current);
        const wpm = getWPM(characterCount, totalMinutes.current);
        const acc = getACC(characterCount, wrongCount)
        const dao = new UserDao(user.uid);
        if (cpm > 0 && wpm > 0) {
          const currentData = await dao.get();
          await dao.update({
            cpm: [...currentData.cpm, cpm],
            wpm: [...currentData.wpm, wpm],
            acc: [...currentData.acc, acc],
            tests: currentData.tests + round
          });
        }
      }

      setRound(round + 1);
      setCharacterCount(0);
      setWrongCount(0);

      if (process.env.NODE_ENV === 'development') {
        rs = await getRandomContentFromGit(language);
      }
      else {
        rs = await getRandomContentFromGit(language);
      }

      // console.log(rs);
      content = rs.content;
      const chunks: string[] = contentToChunks(content);
      contentChunks.current = chunks;
      content = contentChunks.current.shift()!;
    }
    const formatted = formatContent(content);
    let info;
    if (rs) {
      rs.content = content;
      info = rs;
    }
    else {
      fileInfo.content = content;
      info = { ...fileInfo };
    }
    setFileInfo(info);
    setCharacterArray(formatted);
    spanList.current = Array.from(document.querySelectorAll('#typeZone span:not(.caret):not(.comment)'));
  }

  const reset = () => {
    currentIndex.current = 0;
    textAreaRef.current!.value = '';
    spanList.current.forEach((el) => {
      el.classList.remove('isPast');
      el.classList.remove('isNow');
      el.classList.remove('isWrong');
    })
    spanList.current = [];
    wrong.current = false;
  }

  const foccusCallBack = React.useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'Enter') {
      if (containerRef.current) {
        containerRef.current.click();
      }
    }
    if (event.ctrlKey && event.key === 'Backspace') {
    }
    if (event.ctrlKey && event.shiftKey && event.key === 'Enter') {
      history.push(ROUTES.ROOT);
    }
    //eslint-disable-next-line
  }, []);

  // useEffect for content
  React.useEffect(() => {
    const getContent = async () => {
      await loadContent();
    }
    getContent();

    document.addEventListener('keydown', foccusCallBack);

    return () => document.removeEventListener('keydown', foccusCallBack);
    //eslint-disable-next-line
  }, []);

  // useEffect for round
  React.useEffect(() => {
    const secondInterval = setInterval(() => { totalSeconds.current += 1 }, 1000);
    const minuteInterval = setInterval(() => { totalMinutes.current += 1 }, 60000);

    return () => {
      clearInterval(secondInterval);
      clearInterval(minuteInterval);
    }
  }, [round]);

  const moveCursorForward = (index: number) => {
    if (wrong.current) {
      wrong.current = false;
    }
    const nextIndex = index + 1;
    currentIndex.current = nextIndex;
    spanList.current[index].classList.add('isPast');
    spanList.current[index].classList.remove('isNow');
    spanList.current[index].classList.remove('isWrong');
    spanList.current[nextIndex].classList.add('isNow');
  }

  const moveCursorBackward = (index: number) => {
    if (wrong.current) {
      const nextIndex = index + 1;
      if (nextIndex < spanList.current.length) {
        spanList.current[nextIndex].classList.remove('isNow');
      }
      spanList.current[index].classList.add('isNow');
      spanList.current[index].classList.remove('isWrong');
      wrong.current = false;
      currentIndex.current = currentIndex.current - 1 < 0 ? 0 : currentIndex.current - 1;
    }
    else {
      const prevIndex = index - 2 < 0 ? 0 : index - 2;
      currentIndex.current = prevIndex;
      spanList.current[index].classList.remove('isNow');
      spanList.current[index - 1 < 0 ? 0 : index - 1].classList.remove('isPast');
      spanList.current[index].classList.remove('isPast');

      spanList.current[prevIndex].classList.remove('isPast');
      spanList.current[prevIndex].classList.add('isNow');
    }
  }

  const handleType = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Backspace') {
      moveCursorBackward(currentIndex.current);
      setCharacterCount(characterCount === 0 ? 0 : characterCount - 1);
    }
  }
  
  const handleWrong = (index: number) => {
    spanList.current[index].classList.add('isWrong');
    const nextIndex = index + 1;
    if (nextIndex < spanList.current.length) {
      spanList.current[nextIndex].classList.add('isNow');
    }
    spanList.current[index].classList.add('isWrong');
    spanList.current[index].classList.remove('isNow');
    wrong.current = true;

    setWrongCount(wrongCount + 1);
  }

  const handleOnChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    
    if (spanList.current) {
      if (!wrong.current) {
        const character = event.target.value.slice(-1);
        // console.log(currentIndex.current, characterArray[currentIndex.current], character);
        if (characterArray[currentIndex.current] === character) {
          setCharacterCount(characterCount + 1);

          if (currentIndex.current < spanList.current.length - 1) {
            moveCursorForward(currentIndex.current);
          }
          else {
            // Get New Content to type
            reset();
            await loadContent();
            handleFocus();
          }
        }
        else {
          // Handle Wrong First letter
          if (currentIndex.current === 0 && character === '') {
            return;
          }
          handleWrong(currentIndex.current);
        }
      }
      else {
        event.target.value = event.target.value.slice(0, -1);
      }
    }
  }

  const handleFocus = async () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();

      spanList.current = Array.from(document.querySelectorAll('#typeZone span:not(.caret):not(.comment):not(.import):not(.indent)'));

      if (spanList.current.length > 0) {
        if (wrong.current) {
          const nextIndex = currentIndex.current + 1;
          if (nextIndex < spanList.current.length) {
            spanList.current[nextIndex].classList.add('isNow');
          }
        }
        else {
          spanList.current[currentIndex.current].classList.add('isNow')
        }
      }
      else {
        console.log('End of text');

        // Get New Content to type
        reset();
        await loadContent();
      }
    }
  }

  return (
    <div id='typeContainer' onClick={handleFocus} ref={containerRef}>
      <textarea ref={textAreaRef} spellCheck={false} autoFocus onChange={handleOnChange} onKeyDown={handleType} disabled={characterArray.length === 0}></textarea>
      <code id='typeZone'>
        {
          fileInfo.content.length > 0
            ? (
                fileInfo.content.split('\n').map((line, cIndex) => {
                  const words = line.split(' ');
                  let hasEncounterFirstWord = false;
                  const isComment = verifyComment(line);
                  const isImport = verifyImport(line);

                  return (
                    <ul key={cIndex}>
                      {
                        words.map((w, wIndex) => {
                          const word = w.trimRight();
                          if (!hasEncounterFirstWord && word.trim() === '' && words.length > 1) {
                            // This must be an indentation
                            return (
                              <li key={wIndex} className='indent'>&nbsp;</li>
                            )
                          }
                          hasEncounterFirstWord = true;
                          return (
                            <React.Fragment key={wIndex}>
                              <li>
                                {
                                  word.split('').map((character, chIndex) => (
                                    <span key={chIndex} className={
                                      isComment
                                        ? 'comment'
                                        : isImport
                                        ? 'import'
                                        : (character.match(/\s/))
                                        ? 'indent'
                                        // : (word.match(/\s/))
                                        // ? 'space'
                                        : ''
                                    }>
                                      <span className='caret'></span>
                                      {character}
                                    </span>
                                  ))
                                }
                              </li>
                              {
                                (isComment)
                                  ? <span className='comment'>&nbsp;</span>
                                  : (isImport)
                                  ? <span className='import'>&nbsp;</span>
                                  : (wIndex < words.length - 1)
                                  ? <span className='space'>&nbsp;<span className='caret'></span></span>
                                  : <span className='enter'> &#9166; <span className='caret'></span></span>
                              }
                            </React.Fragment>
                          )
                        })
                      }
                    </ul>
                  )
                })
            )
              : (
                <CircularProgress className='spinner'/>
            )
        }
      </code>

      {
        fileInfo.content.length > 0
          ? <InfoDisplay
            chunks={contentChunks.current.length}
            fileInfo={fileInfo}
            cpm={getCPM(characterCount, totalMinutes.current)}
            wpm={getWPM(characterCount, totalMinutes.current)}
            acc={getACC(characterCount, wrongCount)}
            round={round}
          />
        : ''
      }
      
    </div>
  );
}