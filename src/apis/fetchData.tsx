const BASE_URL = 'http://localhost:4000/api/';

export const fetchData = async (endpoint: any) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  const data = await response.json();
  return data;
};
