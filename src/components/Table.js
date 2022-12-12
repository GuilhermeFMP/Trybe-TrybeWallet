import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletUpdate, walletValue, walletEdit } from '../redux/actions';

class Table extends Component {
  editExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(walletEdit(id));
  };

  deleteExpense = (id, converted) => {
    const { expenses, valueTotal, dispatch } = this.props;
    const newExpenses = expenses.filter((expense) => (expense.id !== id));
    const newValue = valueTotal - converted;
    dispatch(walletValue(Number(newValue)));
    dispatch(walletUpdate(newExpenses));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </thead>
        <tbody>
          { expenses.map((expense) => {
            const {
              id, description, value, tag, method, exchangeRates, currency } = expense;
            const money = Object.values(exchangeRates !== undefined
              && exchangeRates).find((exchange) => exchange.code === currency);
            const { name, ask } = money;
            const converted = (Number(ask) * Number(value));
            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{name}</td>
                <td>{Number(ask).toFixed(2)}</td>
                <td>{ (Number(ask) * Number(value)).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.deleteExpense(expense.id, converted) }
                  >
                    Excluir
                  </button>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => this.editExpense(expense.id) }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  valueTotal: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  valueTotal: state.wallet.totalValue,
});

export default connect(mapStateToProps)(Table);
