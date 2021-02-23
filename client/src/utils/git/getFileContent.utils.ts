import { sendGET } from "..";
import { GitFileURLs } from "../../interfaces";

const getFileContent = async (url: string) => {
  const options = {
    headers: {
        "Accept": 'application/vnd.github.v3+json'
    }
  }

  const { download_url }: GitFileURLs = await sendGET({
    url, params: {}, options
  });

  const content: string = await sendGET({
    url: download_url, params: {}, options
  });
  
  return {
    content,
    download_url 
  };
}

export default getFileContent;