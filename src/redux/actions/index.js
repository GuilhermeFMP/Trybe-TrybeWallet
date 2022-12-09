// Coloque aqui suas actions
export const emailSave = (email) => ({
  type: 'EMAIL_FIELD',
  payload: email,
});

export const walletCurrencies = (currencies) => ({
  type: 'WALLET_FETCH',
  payload: currencies,
});

export const walletValue = (value) => ({
  type: 'WALLET_ATT',
  payload: value,
});

export const walletExpenses = (expense) => ({
  type: 'WALLET_EXPENSE',
  payload: expense,
});

export const searchFailure = (error) => (
  { type: 'SEARCH_ERROR', error }
);

export function fetchAPI() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      delete data.USDT;
      const array = Object.keys(data);
      dispatch(walletCurrencies(array));
    } catch (error) {
      dispatch(searchFailure(error));
    }
  };
}
