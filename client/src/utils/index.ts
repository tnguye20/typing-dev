import {
  getRandomRepositoryByLanguage,
  getRandomFileFromRepo,
  getFileContent
} from './git';
import randomNumber from './randomNumber';
import contentToChunks from './contentToChunks.utils';
import sendPOST from './sendPOST';
import sendGET from './sendGET';

export {
  getRandomRepositoryByLanguage,
  getRandomFileFromRepo,
  getFileContent,
  sendPOST,
  randomNumber,
  sendGET,
  contentToChunks
};