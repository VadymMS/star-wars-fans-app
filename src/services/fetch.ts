import axios from 'axios';

interface IHeaders {
  Accept: string;
  'Content-Type': string;
}

const getHeaders = () => {
  const headers: IHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return headers;
};

export const get = async (
  destination: string,
  optionalHeaders?: {[key: string]: string},
): Promise<any> => {
  try {
    const headers = getHeaders();
    const requestHeaders = {...headers, ...optionalHeaders};
    const result = await axios.get(destination, {
      headers: requestHeaders,
    });

    return result;
  } catch (error) {
    console.error(error);
  }
};
