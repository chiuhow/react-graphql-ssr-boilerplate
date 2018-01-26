import axios from 'axios';
import config from 'config';

import logger, { writeApiLog } from '../logger/index'; 

const BASE_URL = `${config.get('apiUrl')}`;
export const COMMON_URL = 'common/';

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
  },
});

export const fetchData = async (url, args) => {
  const response = await client.post(`${BASE_URL}${url}`, args);
  const data = await response.data;

  if (response.status !== 200) {
    logger.error(writeApiLog(url, response));
  } else {
    logger.info(writeApiLog(url, response));
    return data;
  }
};

function checkResponseState(response) {
  return response;
}

function responseErrorState(error) {
  return Promise.resolve(error.response);
}

axios.interceptors.response.use(checkResponseState, responseErrorState);
