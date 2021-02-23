import axios from 'axios';

interface GET_PARAMS {
  url: string,
  params: Record<string, any>,
  options: Record<string, any>
}

const sendGET = async (p: GET_PARAMS) => {
  const rs = await axios.get(
    p.url,
    {
      params: p.params,
      ...p.options,
    }
  );

  const response = rs.data;
  return response;
};

export default sendGET;