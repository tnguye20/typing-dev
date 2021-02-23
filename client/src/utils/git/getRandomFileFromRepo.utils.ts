import { randomNumber, sendGET } from '..'
import { GitFile, LANGUAGES } from '../../interfaces';
import { config } from '../../shared';

const { EXTENSION_MAP } = config;

const getRandomFileFromRepo = async (language: keyof typeof LANGUAGES = 'typescript', repo_full_name: string) => {
  const url = `https://api.github.com/search/code?q=repo:${repo_full_name}+extension:${EXTENSION_MAP[language]}`;

  // Get first record to get the total counts of files
  const params = {
    per_page: '1',
    page: 1
  };
  const options = {
    headers: {
        "Accept": 'application/vnd.github.v3+json'
    }
  }
  const dummy = await sendGET({
    url, params, options
  });

  const total_files = dummy.total_count;
  const rn = randomNumber(1, total_files);
  // Get a random page/file from the list
  params.page = rn;
  const file = await sendGET({
    url, params, options
  });
  
  return file.items[0] as GitFile;
}

export default getRandomFileFromRepo;