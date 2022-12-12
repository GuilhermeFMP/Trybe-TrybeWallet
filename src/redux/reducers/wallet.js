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
  case 'WALLET_UPDATE':
    return {
      ...state,
      expenses: action.payload,
    };
  case 'WALLET_EDIT':
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case 'WALLET_SAVE':
    return {
      ...state,
      expenses: state.expenses
        .map((expense) => (expense.id === Number(state.idToEdit)
          ? ({ id: expense.id, ...action.payload, exchangeRates: expense.exchangeRates })
          : expense)),
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
