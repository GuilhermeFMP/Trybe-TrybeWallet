const URL = 'https://economia.awesomeapi.com.br/json/all';

const moneyAPI = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  delete data.USDT;
  return data;
};

export default moneyAPI;
