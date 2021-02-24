import { config } from "../../shared";
import { GitFileInfo, LANGUAGES } from "../../interfaces";
import {
  getRandomRepositoryByLanguage,
  getRandomFileFromRepo,
  getFileContent,
  randomNumber
} from "../../utils";
import { DefaultContentDao } from "../../daos/DefaultContentDao";
const { MAX_RANDOM_RECORDS } = config;

const getRandomContentFromGit = async (language: keyof typeof LANGUAGES = 'typescript', useDefaults: boolean = false) => {
  try {
    if (useDefaults) throw new Error('Use Default Boi');
    const repo = await getRandomRepositoryByLanguage(language);
    const file = await getRandomFileFromRepo(language, repo.full_name);
    const { download_url, content } = await getFileContent(file.url);

    const info: GitFileInfo = {
      html_url: repo.html_url,
      url: download_url,
      path: file.path,
      owner: repo.owner,
      repo_name: repo.full_name,
      content: content,
    }

    // Cache this info the the DB without the content for legal reasons
    const rn = randomNumber(0, MAX_RANDOM_RECORDS);
    const dao = new DefaultContentDao(language);
    const tmp = { ...info };
    tmp.content = '';
    await dao.addOne(tmp, rn.toString());

    return info;
  }
  catch (error) {
    console.log(error);

    // Reach into the database and get the cached entry
    const rn = randomNumber(0, MAX_RANDOM_RECORDS);
    const dao = new DefaultContentDao(language);
    const randomDefault = await dao.getOne(rn.toString());
    const rs = await fetch(randomDefault.url);
    const content = await rs.text()!;
    return {
      ...randomDefault,
      content
    };

    // const item: GitFileInfo = {
    //   content: '',
    //   ...config.DEFAULT_PATHS[language][0]
    // };
    // for (let i = 0; i <= MAX_RANDOM_RECORDS; i++) {
    //   await dao.addOne(item, i.toString());
    // } 
    // return item;
  }
}

export default getRandomContentFromGit;