// Coloque aqui suas actions
export const emailSave = (email) => ({
  type: 'EMAIL_FIELD',
  payload: email,
});

export const walletCurrencies = (currencies) => ({
  type: 'WALLET_FETCH',
  payload: currencies,
});

export const searchFailure = (error) => (
  { type: 'SEARCH_ERROR', error }
);

export function fetchAPI() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      console.log(data);
      delete data.USDT;
      const array = Object.keys(data);
      dispatch(walletCurrencies(array));
    } catch (error) {
      dispatch(searchFailure(error));
    }
  };
}
