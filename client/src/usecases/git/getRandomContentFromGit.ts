import { config } from "../../shared";
import { GitFileInfo, LANGUAGES } from "../../interfaces";
import {
  getRandomRepositoryByLanguage,
  getRandomFileFromRepo,
  getFileContent,
  randomNumber
} from "../../utils";

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
      content: content
    }

    return info;
  }
  catch (error) {
    console.log(error);
    const { DEFAULT_PATHS } = config;
    const rn = randomNumber(0, DEFAULT_PATHS[language].length - 1);
    const randomDefault = DEFAULT_PATHS[language][rn];
    const rs = await fetch(randomDefault.url);
    // const rs = await fetch('http://localhost:3000/resources/javascript/1');
    const content = await rs.text()!;
    return {
      ...randomDefault,
      content
    };
  }
}

export default getRandomContentFromGit;