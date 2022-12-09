// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  totalValue: 0,
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'WALLET_FETCH':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'SEARCH_ERROR':
    return {
      ...state,
      error,
    };
  case 'WALLET_ATT':
    return {
      ...state,
      totalValue: action.payload,
    };
  case 'WALLET_EXPENSE':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ],
    };
  default:
    return state;
  }
};

export default wallet;
