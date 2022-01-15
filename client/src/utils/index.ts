import {
  getRandomRepositoryByLanguage,
  getRandomFileFromRepo,
  getFileContent
} from './git';
import randomNumber from './randomNumber';
import contentToChunks from './contentToChunks.utils';
import sendPOST from './sendPOST';
import sendGET from './sendGET';
import getACC from './getACC';
import getCPM from './getCPM';
import getWPM from './getWPM';

export {
  getRandomRepositoryByLanguage,
  getRandomFileFromRepo,
  getFileContent,
  sendPOST,
  randomNumber,
  sendGET,
  contentToChunks,
  getACC,
  getCPM,
  getWPM
};