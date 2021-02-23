import { randomNumber, sendGET } from '../'
import { GitRepository } from '../../interfaces';

const getRandomRepositoryByLanguage = async (language: string = 'typescript') => {
  const rn = randomNumber(1, 1000);
  const url = `https://api.github.com/search/repositories`;
  const params = {
    q: `language:${language}`,
    order: 'desc',
    per_page: '1',
    page: rn
  };
  const options = {
    headers: {
        "Accept": 'application/vnd.github.v3+json'
    }
  }

  const rs = await sendGET({
    url, params, options
  });

  return rs.items[0] as GitRepository;
};

export default getRandomRepositoryByLanguage;