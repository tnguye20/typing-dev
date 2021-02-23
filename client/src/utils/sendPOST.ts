import axios from 'axios';

interface POST_PARAMS {
  url: string,
  data: Record<string, any>,
  options: Record<string, any>
}

const sendPOST = async (params: POST_PARAMS) => {
  const rs = await axios.post(
    params.url,
    params.data,
    params.options
  );

  const response = rs.data;
  return response;
};

export default sendPOST;